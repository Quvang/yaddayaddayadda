// Via denne fil behøver vi ikke lave en try catch block hvergang vi arbejder med async await function

module.exports = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
