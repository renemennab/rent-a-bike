const bikesReducer = (bikes = [], action = {}) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload
        case 'CREATE':
            return [...bikes, action.payload]

        default:
            return bikes
    }
}

export default bikesReducer
