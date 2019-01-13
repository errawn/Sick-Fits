//import { withRouter} from 'next/router'
import UpdateItem from '../components/UpdateItem'

// props.query is accessible becase of 'pageProps.query = ctx.query'
// defined in _app.js
const Update = ({ query }) => (
    <div>
        <UpdateItem id={query.id} />
    </div>
)
export default Update
//export default withRouter(Update)