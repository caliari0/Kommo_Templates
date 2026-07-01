from collections.abc import Generator

from sqlalchemy import create_engine, inspect, text
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker


DATABASE_URL = "sqlite:///./app.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)


class Base(DeclarativeBase):
    pass


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def ensure_message_templates_schema() -> None:
    inspector = inspect(engine)
    table_names = inspector.get_table_names()

    with engine.begin() as connection:
        if "category_nodes" not in table_names:
            connection.execute(
                text(
                    "CREATE TABLE category_nodes ("
                    "id INTEGER NOT NULL PRIMARY KEY, "
                    "name VARCHAR(100) NOT NULL, "
                    "parent_id INTEGER NULL, "
                    "path VARCHAR(300) NOT NULL UNIQUE, "
                    "flow VARCHAR(100) NOT NULL DEFAULT 'general', "
                    "created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "
                    "updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "
                    "CONSTRAINT uq_category_nodes_parent_name UNIQUE (parent_id, name), "
                    "FOREIGN KEY(parent_id) REFERENCES category_nodes (id)"
                    ")"
                )
            )
            connection.execute(
                text("CREATE INDEX ix_category_nodes_parent_id ON category_nodes (parent_id)")
            )
            connection.execute(
                text("CREATE INDEX ix_category_nodes_path ON category_nodes (path)")
            )

    if "message_templates" not in table_names:
        return

    columns = {column["name"] for column in inspector.get_columns("message_templates")}
    required_columns = {"category", "language", "flow", "category_id"}
    if required_columns.issubset(columns):
        with engine.begin() as connection:
            if "copy_count" not in columns:
                connection.execute(
                    text(
                        "ALTER TABLE message_templates "
                        "ADD COLUMN copy_count INTEGER NOT NULL DEFAULT 0"
                    )
                )
            if "is_outdated" not in columns:
                connection.execute(
                    text(
                        "ALTER TABLE message_templates "
                        "ADD COLUMN is_outdated BOOLEAN NOT NULL DEFAULT 0"
                    )
                )
                connection.execute(
                    text(
                        "CREATE INDEX IF NOT EXISTS ix_message_templates_is_outdated "
                        "ON message_templates (is_outdated)"
                    )
                )
            if "outdated_commentary" not in columns:
                connection.execute(
                    text(
                        "ALTER TABLE message_templates "
                        "ADD COLUMN outdated_commentary TEXT NULL"
                    )
                )
            if "outdated_reported_by" not in columns:
                connection.execute(
                    text(
                        "ALTER TABLE message_templates "
                        "ADD COLUMN outdated_reported_by VARCHAR(100) NULL"
                    )
                )
        return

    with engine.begin() as connection:
        # Rebuild table to safely support all current schema changes in SQLite,
        # including language column and composite uniqueness.
        connection.execute(text("PRAGMA foreign_keys=OFF"))
        connection.execute(
            text(
                "CREATE TABLE message_templates_new ("
                "id INTEGER NOT NULL PRIMARY KEY, "
                "category VARCHAR(100) NOT NULL DEFAULT 'General', "
                "category_id INTEGER NULL, "
                "flow VARCHAR(100) NOT NULL DEFAULT 'general', "
                "language VARCHAR(2) NOT NULL DEFAULT 'en', "
                "response_code VARCHAR(100) NOT NULL, "
                "content TEXT NOT NULL, "
                "copy_count INTEGER NOT NULL DEFAULT 0, "
                "is_outdated BOOLEAN NOT NULL DEFAULT 0, "
                "outdated_reported_by VARCHAR(100) NULL, "
                "outdated_commentary TEXT NULL, "
                "created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "
                "updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "
                "CONSTRAINT uq_response_code_language UNIQUE (response_code, language), "
                "FOREIGN KEY(category_id) REFERENCES category_nodes (id)"
                ")"
            )
        )
        if "category" in columns and "language" in columns:
            connection.execute(
                text(
                    "INSERT INTO message_templates_new "
                    "(id, category, category_id, flow, language, response_code, content, copy_count, is_outdated, outdated_reported_by, outdated_commentary, created_at, updated_at) "
                    "SELECT id, "
                    "COALESCE(category, 'General') AS category, "
                    "NULL AS category_id, "
                    "'general' AS flow, "
                    "COALESCE(language, 'en') AS language, "
                    "response_code, content, 0 AS copy_count, 0 AS is_outdated, NULL AS outdated_reported_by, NULL AS outdated_commentary, created_at, updated_at "
                    "FROM message_templates"
                )
            )
        else:
            connection.execute(
                text(
                    "INSERT INTO message_templates_new "
                    "(id, category, category_id, flow, language, response_code, content, copy_count, is_outdated, outdated_reported_by, outdated_commentary, created_at, updated_at) "
                    "SELECT id, "
                    "'General' AS category, "
                    "NULL AS category_id, "
                    "'general' AS flow, "
                    "'en' AS language, "
                    "response_code, content, 0 AS copy_count, 0 AS is_outdated, NULL AS outdated_reported_by, NULL AS outdated_commentary, created_at, updated_at "
                    "FROM message_templates"
                )
            )
        connection.execute(text("DROP TABLE message_templates"))
        connection.execute(text("ALTER TABLE message_templates_new RENAME TO message_templates"))
        connection.execute(
            text("CREATE INDEX ix_message_templates_category ON message_templates (category)")
        )
        connection.execute(
            text("CREATE INDEX ix_message_templates_language ON message_templates (language)")
        )
        connection.execute(
            text("CREATE INDEX ix_message_templates_flow ON message_templates (flow)")
        )
        connection.execute(
            text("CREATE INDEX ix_message_templates_category_id ON message_templates (category_id)")
        )
        connection.execute(
            text(
                "CREATE INDEX ix_message_templates_response_code "
                "ON message_templates (response_code)"
            )
        )
        connection.execute(
            text(
                "CREATE INDEX ix_message_templates_is_outdated "
                "ON message_templates (is_outdated)"
            )
        )
        connection.execute(text("PRAGMA foreign_keys=ON"))


def ensure_users_schema() -> None:
    inspector = inspect(engine)
    table_names = inspector.get_table_names()
    if "users" in table_names:
        return

    with engine.begin() as connection:
        connection.execute(
            text(
                "CREATE TABLE users ("
                "id INTEGER NOT NULL PRIMARY KEY, "
                "username VARCHAR(100) NOT NULL UNIQUE, "
                "password_hash VARCHAR(200) NOT NULL, "
                "role VARCHAR(20) NOT NULL DEFAULT 'user', "
                "is_active BOOLEAN NOT NULL DEFAULT 1, "
                "created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "
                "updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP"
                ")"
            )
        )
        connection.execute(text("CREATE INDEX ix_users_username ON users (username)"))
