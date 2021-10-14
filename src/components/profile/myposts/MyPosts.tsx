import React from "react";
import classes from './MyPosts.module.css'
import {Post} from "./post/Post";
import {PostType} from "../../../Redux/Store";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormControls/FormControls";


type PropsType = {
    posts: Array<PostType>
    newPostText: string
    addPost: (value: string) => void
}
type FormDataTypes = {
    newPostText: string
}
let newPostElement = React.createRef<HTMLTextAreaElement>();

export const maxLength50 = maxLengthCreator(50)

const NewPostElementForm: React.FC<InjectedFormProps<FormDataTypes>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field  component={Textarea} name={"newPostElement"} placeholder={"Say something"} validate={[required, maxLength50]} />
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>
}

const NewPostElementFormRedux = reduxForm<FormDataTypes>({
    form: "NewPost"
})(NewPostElementForm)

const MyPosts = (props: PropsType) => {

    let postsElements = props.posts.map((post) => <Post message={post.message} id={post.id} like={post.like}/>)


    let onAddPost = (value: FormDataTypes) => {
        props.addPost(value.newPostText)
    }

    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <div>
                <NewPostElementFormRedux onSubmit={onAddPost}  />
            </div>
            <div className={classes.posts}>
                {postsElements}
            </div>

        </div>
    )

}






export default MyPosts;


    

