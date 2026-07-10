# Category Data Structure

This file gives a practical overview of how support categories and templates are organized.

Quick version:

- categories are a 3-level tree
- templates are attached to specific nodes in that tree
- each template exists per language (`en`, `es`, `pt`)
- warnings are contextual in the UI (per selected category node)

## Big Picture

The app models support operations like a folder tree:

1. **Parent node** = main support domain  
2. **Child node** = sub-domain inside that parent  
3. **Grandchild node** = concrete scenario handled by support

Templates live at the scenario level, so they are ready to use for real conversations.

## Tree Shape Used

The current seeded structure follows:

- **25 parent nodes**
- each parent has **5 children** (one per channel: Email, WhatsApp, Phone, SMS, Chat)

So total category nodes are:

- `25 + (25*5) = 150`

## Main Tables

### `category_nodes`

This stores the hierarchy.

Core columns:

- `id`
- `name`
- `parent_id` (nullable, points to parent node)
- `path` (materialized path like `Parent > Child > Grandchild`)

Why `path` is nice:

- breadcrumb rendering is easy
- subtree filtering is straightforward
- the UI can use prefix checks for quick node scoping

### `message_templates`

This stores the actual support messages.

Core columns:

- `id`
- `category` (path text)
- `category_id` (foreign key to `category_nodes.id`)
- `language` (`en`, `es`, `pt`)
- `response_code`
- `content`

Current response-code rule:

- same conceptual template gets the same code across languages
- unique inside each language
- lowercase words, concatenated

## How Categories Connect to Templates

Every template carries:

- the exact category path
- the category node id

This means the UI can filter by:

- selected node path
- language

## Example Mental Model

Think of one branch like this:

- `Order Status`
  - `Email`

For that `Email` scenario, you can have templates such as:

- delivery update
- shipping delay apology
- address-change limitation guidance

And each one is available in:

- English
- Spanish
- Portuguese

## UI Behavior Tied to This Data

The Category Explorer loads the category tree and lets users navigate by node, with breadcrumbs and an "Up one level" control.

Warnings are contextual, so the warning block can change when the user changes the selected node. That keeps guidance specific to the case being handled.

### Creating nodes in the UI (manager/developer)

The **New node** action follows the current selection:

- No node selected — creates a **top-level** category node (no parent).
- A node selected in the explorer — creates a **child** under that node.

**Rename** and **Delete** apply to the selected node, including top-level roots.

### Creating nodes via CSV import

CSV import (`POST /templates/import/csv`) resolves each row's `category` column as a `>`-delimited path and walks it level by level:

- Any segment missing under its parent is created automatically, so the full category tree doesn't need to exist ahead of time.
- Matching is case-insensitive (`billing` matches an existing `Billing` node), so re-importing the same path with different casing reuses the same node instead of creating a duplicate.
- When a brand-new node is created, all-lowercase segment words are auto-capitalized (`billing` → `Billing`); segments with deliberate mixed casing (e.g. `FAQ`, `API`) are kept as typed.
- Manual template create/update use the same resolution logic.

## Why This Structure Works Well

It gives you:

- clear navigation for support teams
- realistic scenario-level template placement
- clean separation between structure (categories) and content (templates)
- multilingual coverage without duplicating category trees

In short: easy to scale, easy to filter, and practical for day-to-day support operations.
