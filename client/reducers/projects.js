function reducer(state = [], action) {
	switch(action.type) {
		case 'FETCH_ACTIVE_PROJECTS_RESPONSE':
			return action.data
		default:
			return state
		
	}

}

export default reducer