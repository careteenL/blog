let dispatch;//undefined
console.log(dispatch);
let obj = {
    dispatch: () => dispatch
}
console.log(obj.dispatch);
dispatch = 'dispatch';
console.log('dispatch', dispatch);
console.log('obj.dispatch', obj.dispatch());
