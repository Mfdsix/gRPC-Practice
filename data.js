const DATAS = []

const getAll = () => {
    return DATAS
}

const add = (payload) => {
    const new_id = "dt-" + new Date().getTime()
    DATAS.push({
        id: new_id,
        ...payload
    })
    
    return new_id
}

module.exports = {
    getAll,
    add
}