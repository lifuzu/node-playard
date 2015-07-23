// Reference: http://bahmutov.calepin.co/immutable-javascript-example.html

var Immutable = require('seamless-immutable');
function Todos(todos) {
  todos = todos || Immutable([]);
  var todosModule = {
    add: function (label) {
      var newTodo = {
        label: label,
        done: false
      };
      var added = todos.concat(newTodo);
      // return new object
      return Todos(added);
    },
    done: function (index) {
      var changed = todos.map(function (todo, k) {
        return k === index ? {
          label: todo.label,
          done: true
        } : todo;
      });
      // return new object
      return Todos(changed);
    },
    toString: function () {
      return todos.map(function (todo, k) {
        return k + ': ' + todo.label + ' ' + (todo.done ? 'done' : '');
      }).join('\n');
    }
  };
  return todosModule;
}

function TodosWithUndo() {
  var states = [Todos()];
  var t = {
    add: function (label) {
      states.push(states[states.length - 1].add(label));
      return t;
    },
    done: function (index) {
      states.push(states[states.length - 1].done(index));
      return t;
    },
    undo: function () {
      if (states.length > 1) {
        states.pop();
      }
      return t;
    },
    toString: function () {
      return states[states.length - 1].toString();
    }
  };
  return t;
}

var ts = TodosWithUndo();
// ts is mutable
ts.add('foo').add('bar');
console.log('after done first');
ts.done(0);
// prints
// 0: foo done
// 1: bar
console.log(ts.toString());
ts.undo();
console.log(ts.toString());
// prints
// 0: foo
// 1: bar


