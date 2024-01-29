const DATAS = []

const getAll = () => {
    return DATAS
}

const add = (payload) => {
    DATAS.push(payload)
}

module.exports = {
    getAll,
    add
}