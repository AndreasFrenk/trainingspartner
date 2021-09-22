import { userActions } from '../../actions/users'
import { useDispatch, useSelector } from "react-redux";
import { create, getAll } from '../../actions/posts';
import { useEffect , useState} from 'react'; 
import FeedPostCard from './feed-postCard';
import { BaseSyntheticEvent, SyntheticEvent } from 'react-router/node_modules/@types/react';
export const Feed = () => {
    const dispatch = useDispatch()
    const posts = useSelector((state: any) => state.posts).posts
    const user = JSON.parse(useSelector((state:any) => state.authentication).user)
    const [postMessage, setpostMessage] = useState("")
    const changePostMessage = (event: BaseSyntheticEvent) => {
        setpostMessage(event.target.value)
    }
    const submitPost = (event: React.FormEvent<HTMLFormElement>)=> {
        event.preventDefault()
        dispatch(create({
            user: user._id,
            text: postMessage
        }, user))
        setpostMessage("")
    }
    useEffect(() => {
        dispatch(getAll())
    }, [])
    return (
        <div>
            <h1 className="text-xl">User Feed</h1>
            <div className="mx-64 my-4 border">
                <form onSubmit={(e) => submitPost(e)}>

                <input className="w-full" type="texwkt" placeholder="Post something here..." value={postMessage} onChange={(e)=>changePostMessage(e)}></input>
                </form>
            </div>
            {posts?
            <div className="">

                {posts.map((post:any , index:string) => (
                    <FeedPostCard index={index} post={post} key={index}></FeedPostCard>
                )) }
            </div> :
            <div>Loading</div>}
        </div>
    )
}
