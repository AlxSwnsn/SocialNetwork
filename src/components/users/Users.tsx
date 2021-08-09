import React from "react";
import classes from "./Users.module.css";
import userPhoto from "../../assets/Images/user.jpg";
import {NavLink} from "react-router-dom";
import {UserType} from "../../Redux/UsersReducer";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    followingProgress: Array<number>
}
export let Users = (props: PropsType) => {


    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div>
        <div>
            {pages.map(p => {
                return <span className={props.currentPage === p ? classes.selectedPage : " "} onClick={(e) => {
                    props.onPageChanged(p)
                }}>{p}</span>
            })}
        </div>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={"/profile/" + u.id}>
                        <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={classes.userPhoto}/>
                        </NavLink>
                    </div>

                    <div>
                        {u.followed ?
                            <button disabled={props.followingProgress.some(id => id === u.id)} onClick={() => {
                                props.unfollow(u.id)

                            }}>Unfollow</button>

                            : <button disabled={props.followingProgress.some(id => id === u.id)} onClick={() => {
                               props.follow(u.id)


                            }}>Follow</button>}
                                </div>
                                </span>

                <span>
                                <span>
                                <div>{u.name}</div>
                                <div>{u.status}</div>
                                </span>
                                <span>
                                <div>{"u.location.country"}</div>
                                <div>{"u.location.city"}</div>
                                </span>
                                </span>

            </div>)
        }
    </div>
}
