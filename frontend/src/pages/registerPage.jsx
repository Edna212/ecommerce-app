import api from '../utils/api'

const { data } = await api.post('/users/register', { name, email, password })