const TodoList = require("../src/TodoList.js")

describe("TodoList", () => {
  let todoList

  beforeEach(() => {
    todoList = new TodoList()
  })

  it("creates a todo item", () => {
    // set up
    const expected = {
      id: 1,
      text: "turn the heating on!",
      status: "incomplete"
    }

    // execute
    const result = todoList.create("turn the heating on!")

    // verify
    expect(result).toEqual(expected)
  })

  it("returns all items", () => {
    // set up
    const item1 = {
      id: 1,
      text: "turn the heating on!",
      status: "incomplete"
    }
    const item2 = {
      id: 2,
      text: "Do the washing up",
      status: "incomplete"
    }
    const expected = [item1, item2]

    // execute
    todoList.create("turn the heating on!")
    todoList.create("Do the washing up")

    // verify
    expect(todoList.showAll()).toEqual(expected)
  })

  it("sets item to be complete if found", () => {
    // set up
    const item1 = todoList.create("turn the heating on!")
    const expected = {
      id: 1,
      text: "turn the heating on!",
      status: "complete"
    }

    // execute
    const result = todoList.setComplete(item1.id)

    // verify
    expect(result).toEqual(expected)
  })

  it("throws error if not found", () => {
    // set up

    // execute, verify
    expect(() => todoList.setComplete(1)).toThrowError("Item not found")
  })

  it("gets incomplete items", () => {
    // set up
    const item1 = todoList.create("turn the heating on!")
    const item2 = todoList.create("Do the washing up")
    todoList.setComplete(item1.id)
    const expected = [item2]

    // execute
    const result = todoList.getByStatus("incomplete")

    // verify
    expect(result).toEqual(expected)
  })

  it("gets complete items", () => {
    // set up
    const item1 = todoList.create("turn the heating on!")
    const item2 = todoList.create("Do the washing up")
    todoList.setComplete(item1.id)
    const expected = [item1]

    // execute
    const result = todoList.getByStatus("complete")

    // verify
    expect(result).toEqual(expected)
  })

  it("finds item by id", () => {
    // set up
    const item1 = todoList.create("turn the heating on!")
    const expected = {
      id: 1,
      text: "turn the heating on!",
      status: "incomplete"
    }

    // execute
    const result = todoList.findBy(item1.id)

    // verify
    expect(result).toEqual(expected)
  })

  it("findBy throws error if not found", () => {
    // set up

    // execute, verify
    expect(() => todoList.findBy(1)).toThrowError("Item not found")
  })

  it("deletes item by id", () => {
    // set up
    const item1 = todoList.create("turn the heating on!")
    const expected = {
      id: 1,
      text: "turn the heating on!",
      status: "incomplete"
    }

    // execute
    const deletedItem = todoList.deleteBy(1)

    // verify
    expect(deletedItem).toEqual(expected)
    expect(todoList.showAll()).toEqual([])
  })

  it("delete throws error if not found", () => {
    // set up

    // execute, verify
    expect(() => todoList.deleteBy(1)).toThrowError("Item not found")
  })

  it("Show only the first 20chars when displaying all items and replace the rest with '...' ", () => {
    // set up
    const item1 = {
      id: 1,
      text: "Please turn the heat...",
      status: "incomplete"
    }
    const item2 = {
      id: 2,
      text: "Do the washing up",
      status: "incomplete"
    }
    const expected = [item1, item2]

    // execute
    todoList.create("Please turn the heating on only after 8pm!")
    todoList.create("Do the washing up")

    // verify
    expect(todoList.showAll()).toEqual(expected)
  })

  it("When displaying single items, show the whole item text", () => {
    // set up
    const expected = [{
      id: 1,
      text: "Please turn the heating on only after 8pm!",
      status: "incomplete"
    }]

    // execute
    todoList.create("Please turn the heating on only after 8pm!")

    // verify
    expect(todoList.showAll()).toEqual(expected)
  })
})