class TodoList {
  constructor () {
    this.id = 0
    this.items = []
  }

  create (str) {
    this.id++
    const item = { id: this.id, text: str, status: 'incomplete' }
    this.items.push(item)
    return item
  }

  cleanUpText () {
    if (this.items.length > 1) {
      for (let i = 0; i < this.items.length; i++) {
        let itemText = this.items[i].text;
        if (itemText.length > 20) {
          const newText = itemText.substring(0, 20) + "..."
          this.items[i].text = newText 
        }
      }
      return this.items
    }
    return this.items
  }

  showAll () {
    return this.cleanUpText()
  }

  setComplete (id) {
    const item = this.findBy(id)
    item.status = 'complete'
    return item
  }

  getByStatus (status) {
    return this.items.filter(item => item.status === status)
  }

  findBy (id) {
    const item = this.items.find(item => item.id === id)
    if (item === undefined) throw new Error('Item not found')
    return item
  }

  deleteBy (id) {
    const item = this.findBy(id)
    const index = this.items.indexOf(item)
    return this.items.splice(index, 1)[0]
  }
}
const toDoList = new TodoList()
console.log(toDoList.create("Please turn the heating on only after 8pm!"))
// console.log(toDoList.create('test'))
console.log(toDoList.showAll())

module.exports = TodoList
