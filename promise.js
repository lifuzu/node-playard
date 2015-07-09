
var _ = require("lodash");


var list = [{"id": 0}, {"id": 2}];

function getId(cb) {
  var ret = {"no": 2};
  cb(ret);
}

function getIdPromise() {
  return new Promise(function(fulfill, reject) {
    try {
      var ret = {"no": 2};
      fulfill(ret);
    } catch(ex) {
      reject(ex);
    }
    
  })
}

function saveA(A, cb) {
  setTimeout(function(A) {
    console.log("in saveA");
    cb(A);
  }, 1000, A);
}

function saveAPromise(A) {
  return new Promise(function(fulfill, reject) {
    try {
      setTimeout(function(A) {
        console.log("in saveAPromise");
        fulfill(A)
      }, 1000, A);
    } catch (ex) {
      reject(ex)
    }
  })
}


function updateA(A, cb) {
  if (_.findIndex(list, 'id', 1) === -1) {
    getId(function(val){
      A.message = "World!";
      A.no = val.no;
      cb(A);
    })
  } else {
    A.message = "hello";
    cb(A);
  }
}

function updateAPromise(A) {
  return new Promise(function(fulfill, reject) {
    if (_.findIndex(list, 'id', 1) === -1) {
      getIdPromise().then(function(val){
        A.message = "World!";
        A.no = val.no;
        fulfill(A);
      }, function(res) {
        reject(res);
      })
    } else {
      A.message = "hello";
      fulfill(A);
    }
  });
}

function main() {
  var A = {};
  updateA(A, function(A) {
    saveA(A, function(){
      console.log("B");
    });
  });
  console.log("A");
}

function mainPromise() {
  var A = {};
  updateAPromise(A).then(saveAPromise(A).then(function(res){
    console.log(res);
    console.log("B");
  }, function(res) {
    console.log(res)
  }), function(res) {
    console.log(res);
  });
  console.log("A");
}

mainPromise();