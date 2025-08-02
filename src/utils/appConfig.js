const appConfig = {
    statusTypes: [
        {
            statusId: 'ALL_TASKS',
            name: 'All Tasks',
            order: 0
        },
        {
            statusId: 'PENDING',
            name: 'Pending',
            order: 1
        },
        {
            statusId: 'IN_PROGRESS',
            name: 'In Progress',
            order: 2
        },
        {
            statusId: 'COMPLETED',
            name: 'Completed',
            order: 3
        }
    ],
    filterTypes: [
        {
            filterId: 'DUE_DATE',
            name: 'Due Date'
        },
        {
            filterId: 'ABC',
            name: 'A-Z'
        },
        {
            filterId: 'ABC_REVERSE',
            name: 'Z-A'
        }
    ]
}

export default appConfig;