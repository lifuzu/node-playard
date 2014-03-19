readline = require "readline"
rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})


#rl.question "What do you think of node.js? ", (answer) ->
#  console.log("Thank you for your valuable feedback:", answer)
#  rl.close()

rl.on 'SIGINT', () ->
  rl.question 'Are you sure you want to exit?', (answer) ->
    rl.pause() if answer.match(/^y(es)?$/i)

rl.setPrompt('OHAI>')
rl.prompt()

rl.on 'line', (line) ->
  switch line.trim()
    when 'hello' then console.log 'world!'
    when 'move' then readline.moveCursor process.stdout, 10, 2
    else
      console.log 'Say what? I might have heard `' + line.trim() + '`'
  rl.prompt()

rl.on 'close', () ->
  console.log 'Have a great day!'
  process.exit(0)
