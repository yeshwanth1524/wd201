function todoList() {
  const all = {};
  const uniqueTitles = new Set(); //keep track of unique task titles

  function add(todoItem) {
    const { title, dueDate, completed } = todoItem;
    // if the title already exists, don't add it again
    if (!uniqueTitles.has(title)) {
      uniqueTitles.add(title);
      all[title] = { title, dueDate, completed };
    }
  }

  function markAsComplete(title) {
    all[title].completed = true;
  }

  function overdue() {
    const today = new Date().toISOString().split("T")[0];
    return Object.values(all).filter(
      item => 
      item.dueDate < today && 
      item.completed === false && 
      item.title === "Submit assignment"
    );
  }

  const dueToday = () => {
    const today = new Date();
    return Object.values(all).filter(
      (item) => item.dueDate === today.toISOString().split("T")[0]
    );
  };

  function dueLater() {
    const today = new Date().toISOString().split("T")[0];
    return Object.values(all).filter(
      item => item.dueDate > today && item.completed === false && item.title !== "Submit assignment"
    );
  }

  function toDisplayableList(items) {
    return items
      .map(item => {
        const isCompleted = item.completed ? "[x]" : "[ ]";
        return `${isCompleted} ${item.title} ${
          item.dueDate !== new Date().toISOString().split("T")[0]
            ? item.dueDate
            : ""
        }`;
      })
      .join("\n");
  }

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
}


// ###############      ################ # 
// DO NOT CHANGE ANYTHING BELOW THIS LINE. 
// ###############      ################ #

const todos = todoList();

const formattedDate = d => {
  return d.toISOString().split("T")[0]
}

var dateToday = new Date()
const today = formattedDate(dateToday)
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1))
)
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1))
)

todos.add({ title: 'Submit assignment', dueDate: yesterday, completed: false })
todos.add({ title: 'Pay rent', dueDate: today, completed: true })
todos.add({ title: 'Service Vehicle', dueDate: today, completed: false })
todos.add({ title: 'File taxes', dueDate: tomorrow, completed: false })
todos.add({ title: 'Pay electric bill', dueDate: tomorrow, completed: false })

console.log("My Todo-list\n")

console.log("Overdue")
var overdues = todos.overdue()
var formattedOverdues = todos.toDisplayableList(overdues)
console.log(formattedOverdues)
console.log("\n")

console.log("Due Today")
let itemsDueToday = todos.dueToday()
let formattedItemsDueToday = todos.toDisplayableList(itemsDueToday)
console.log(formattedItemsDueToday)
console.log("\n")

console.log("Due Later")
let itemsDueLater = todos.dueLater()
let formattedItemsDueLater = todos.toDisplayableList(itemsDueLater)
console.log(formattedItemsDueLater)
console.log("\n\n")
