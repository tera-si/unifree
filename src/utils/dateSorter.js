export const itemDateSortByLatest = (item1, item2) => -(new Date(item1.datePosted) - new Date(item2.datePosted))

export const messageDateSortByLatest = (message1, message2) => (new Date(message1.dateSent) - new Date(message2.dateSent))
