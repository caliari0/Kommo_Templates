from fastapi import APIRouter
from fastapi.responses import FileResponse


router = APIRouter()


@router.get("/ui", include_in_schema=False)
def get_ui() -> FileResponse:
    return FileResponse("app/adapters/web/static/index.html")
