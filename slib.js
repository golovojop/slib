/**
 * https://stackoverflow.com/questions/11279441/return-all-of-the-functions-that-are-defined-in-a-javascript-file
 */

(function(){

var root = this;
var _ = root.__ = new Object();

/****************************************************************************************
 * Comparators
 */
  
_.isEqual = function(x, y) {
    return (x == y);
};
_.isLess = function(x, y) {
    return (x < y);
};
_.isLessOrEqual = function(x, y) {
    return x <= y;
};
_.isGreater = function(x, y) {
    return x > y;
};
_.isGreaterOrEqual = function(x, y) {
    return x >= y;
};

_.ascent = function() {return this.isGreater};
_.descent = function() {return this.isLess};

_.existy = function(val) {
    return val != null;
}


/************************************************************************************/


/**
 *
 */
_.isEmpty = function(a){
    return a.length == 0;
}

_.noEmpty = function(a) {
    return !_.isEmpty(a);
}


/************************************************************************************/

_.cl = function(header, msg) {
    console.log([header, msg].join(" "));
}


/************************************************************************************/

_.fail = function(thing) {
    throw new Error(thing);
}
    
_.warn = function(thing) {
    console.log(["WARNING:", thing].join(' '));
}

_.note = function(thing) {
    console.log(["NOTE:", thing].join(' '));
}

/************************************************************************************/


_.isIndexed = function (item){
    _.cl("isIndex:", item.length);
    return (_.isArrayLike(item) || (typeof item === 'string'));
}

/**
 *
 * https://stackoverflow.com/questions/24048547/checking-if-an-object-is-array-like
 */
_.isArrayLike = function(item) {
    return Array.isArray(item)
			|| (_.existy(item)
			&& typeof item === "object"
			&& item.hasOwnProperty("length")
			&& typeof item.length === "number");
			// && item.length > 0
			// && (item.length - 1) in item
}

_.isFunction = function(val) {
    return (typeof val === 'function');
}

_.isNumber = function(n) {
    return (typeof n === 'number');
}

_.abs = function(n) {
    return n > 0 ? n : (-n);
}



/***********************************************************************************
 *	ARRAYS
 */


/**
 * @head - any value
 * @trail - any value
 *
 */
_.cat = function() {
	
    var head = _.first(arguments);
	return _.existy(head) ? head.concat.apply(head, _.rest(arguments)) : [];
}

_.construct = function(head, tail) {
    return _.cat([head], _.toArray(tail));
}

/**
 *
 */
_.toArray = function(item){
    return _.isArrayLike(item) ? Array.prototype.slice.call(item) : [item];
}

_.nth = function(a, index) {
    if (!_.isNumber(index))
	_.fail("Expected a number as the index");
    if (!_.isIndexed(a))
	_.fail("Not supported on non-indexed type");
    if ((index < 0) || (index > a.length - 1))
	_.fail("Index value is out of bounds");
    
    return a[index];
}


/**
 * Get arr[0]
 */
_.first = function(arr) {
    return _.isArrayLike(arr) ? arr[0] : null;
}

/**
 * Get arr[1]
 */
_.second = function(arr) {
    return _.isArrayLike(arr) && arr.length > 1 ? arr[1] : null;
}

/**
 *
 */
_.rest = function(arr){
    return (_.isArrayLike(arr) && arr.length > 1) ? Array.prototype.slice.call(arr, 1) : [];
}

/**
 * Generate array
 */
_.range = function(n) {
//    var arr = [];

//    if (n > 0){
//		for(i = 0; i < _.abs(n); i++) arr[i] = i;
//    }
//    return arr;
	
//	var arr = new Array(n);
	//return Array.prototype.map.call(new Array(_.abs(n)), function(curr, i, a){ return a[i] = i })
	return (new Array(_.abs(n))).map(function(curr, i, a){ 
										_.cl(i, "");
										return a[i] = i; })
	
}

/**
 *
 */
_.map = function(arr, fun) {
    return arr.map(fun);
}

/**
 *
 */
_.contains = function(arr, pattern) {

    if(_.isArrayLike(arr) && _.noEmpty(pattern)) {
       
	return arr.reduce(function(){
		    var acc = arguments[0];		/* accumulator */
		    var curr = arguments[1];	/* next element */
			
	    	return acc || (curr === pattern);
	    },
		false);
    }
    else
		return _.existy(arr[pattern]);
}


})();