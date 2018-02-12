define([], function(){
  'user strict';


  /**
  * @class Deque
  */
  function Deque(){

    this.deque = [];

  }

  /**
   * @memberof Deque
   */
  Deque.prototype.size = function(){
    return this.deque.length;
  }

  /**
   * @memberof Deque
   */
  Deque.prototype.max_size = function(){
    return window.conditions.maxHistoryLen;
  }

  /**
   * @memberof Deque
   */
  Deque.prototype.empty = function(){
    return this.size() == 0;
  }

  /**
   * @memberof Deque
   */
  Deque.prototype.at = function(i){
    return this.deque[i];
  }

  /**
   * @memberof Deque
   */
  Deque.prototype.front = function(){
    return this.deque[0];
  }

  /**
   * @memberof Deque
   */
  Deque.prototype.back = function(){
    return this.deque[this.size()-1];
  }

  /**
   * @memberof Deque
   */
  Deque.prototype.push_back = function(element){
    if(this.size() == this.max_size())
      this.deque.shift();


    this.deque.push(element);
  }

  /**
   * @memberof Deque
   */
  Deque.prototype.push_front = function(element){
    if(this.size() == this.max_size())
      this.pop_back();

    this.deque.unshift(element);
  }

  /**
   * @memberof Deque
   */
  Deque.prototype.pop_front = function(){
    var element = this.deque[0] == undefined ? null : this.deque.shift();
    return element;
  }

  /**
   * @memberof Deque
   */
  Deque.prototype.pop_back = function(){
    var element = this.deque[0] == undefined ? null : this.deque.pop();
    return element;
  }

  /**
   * @memberof Deque
   */
  Deque.prototype.clear = function(){
    this.deque = null;
  }

  /**
   * @memberof Deque
   */
  Deque.prototype.is_full = function(){
    return this.size() == this.max_size();
  }

  /**
   * @memberof Deque
   */
  Deque.prototype.to_array = function(){
    return this.deque;
  }

  return Deque;

});
