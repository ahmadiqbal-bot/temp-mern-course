import axios from "axios";

const custom= axios.create({
    baseURL:'/api/v1'
})
export default custom