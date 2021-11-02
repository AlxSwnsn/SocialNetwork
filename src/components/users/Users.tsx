import React from "react";
import classes from "./Users.module.css";
import userPhoto from "../../assets/Images/user.jpg";
import {NavLink} from "react-router-dom";
import {UserType} from "../../Redux/UsersReducer";
import {Pagination} from "../common/Pagination/Pagination";

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

    return <div>
        <Pagination currentPage={props.currentPage} onPageChanged={props.onPageChanged}
                    totalUsersCount={props.totalUsersCount} pageSize={props.pageSize}/>
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
