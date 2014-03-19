var args = {a: 2};
(function a() {
  var a = 1;
  console.log(a);
  console.log(args);
  var map = { a: a };
  args.map = map;
})(args);

console.log(args);
