function asyncGetA(A, cb) {
	setTimeout(function(A){
		A.a = "hello";
		cb(A);
	}, 2000, A);
}

function getAa(A, cb) {
	asyncGetA(A, function(A) {
		cb(A);
	});
	// A.a = "hello";
	// cb(A);
}


function getAb(A, cb) {
	if (A.color == "red") {
		A.b = "world";
	}
	cb(A);
}

function getAc(A) {
	A.c = 'test';
	return A;
}

function saveA(A) {
	console.log(A);
}

function getAB(A, cb) {
	getAa(A, function(A) {
		getAb(A, cb);
	});
}

// function getAB(A, cb) {
// 	getAa(A, function(A) {
// 		getAb(A, cb);
// 	});
// }


function main() {
	A = {'a':'', 'b':'', 'c':''};
	A['color'] = 'red';
	getAB(A, function(A) {
		A = getAc(A);
		saveA(A);
	});
}

main();
