# Support Flows Data Structure

This file gives a practical overview of how support flows and templates are organized.

Quick version:

- categories are a 3-level tree
- templates are attached to specific nodes in that tree
- each template exists per language (`en`, `es`, `pt`)
- warnings are contextual in the UI (per selected node/flow)

## Big Picture

The app models support operations like a folder tree:

1. **Parent node** = main support domain  
2. **Child node** = sub-domain inside that parent  
3. **Grandchild node** = concrete scenario handled by support

Templates live at the scenario level, so they are ready to use for real conversations.

## Tree Shape Used

The current seeded structure follows:

- **5 parent nodes**
- each parent has **3 children**
- each child has **5 grandchildren**

So total category nodes are:

- `5 + (5*3) + (5*3*5) = 95`

## Main Tables

### `category_nodes`

This stores the hierarchy.

Core columns:

- `id`
- `name`
- `parent_id` (nullable, points to parent node)
- `path` (materialized path like `Parent > Child > Grandchild`)
- `flow` (flow key, e.g. `order_delivery`)

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
- `flow`
- `language` (`en`, `es`, `pt`)
- `response_code`
- `content`

Current response-code rule:

- same conceptual template gets the same code across languages
- unique inside each language
- lowercase words, concatenated

## How Flows Connect to Templates

Every template carries:

- the exact category path
- the category node id
- the flow id

This means the UI can filter in multiple ways:

- by selected node path
- by selected flow tab
- by language

## Example Mental Model

Think of one branch like this:

- `Order and Delivery Support`
  - `Order Status`
    - `In Transit`

For that `In Transit` scenario, you can have templates such as:

- delivery update
- shipping delay apology
- address-change limitation guidance

And each one is available in:

- English
- Spanish
- Portuguese

## UI Behavior Tied to This Data

The explorer loads the category tree and lets users navigate by flow and node.

Warnings are contextual, so the warning block can change when the user changes selected node/flow.  
That keeps guidance specific to the case being handled.

### Creating nodes in the UI (manager/developer)

The **New node** action follows the active flow tab:

- **All flows** — creates a **top-level** category node (no parent). Optional flow in the dialog defaults to `general` on the server when omitted.
- A **specific flow** tab — creates a **child** under the **currently selected** node in the explorer. The user must select a parent node in that flow first.

**Rename** and **Delete** apply to the selected node, including top-level roots.

## Why This Structure Works Well

It gives you:

- clear navigation for support teams
- realistic scenario-level template placement
- clean separation between structure (categories) and content (templates)
- multilingual coverage without duplicating category trees

In short: easy to scale, easy to filter, and practical for day-to-day support operations.
