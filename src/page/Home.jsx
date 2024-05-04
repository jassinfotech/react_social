import { useState, useEffect } from 'react'
import axios from "axios";
import Header from './Header'
import { Link, useNavigate } from "react-router-dom";
function Home() {
    const isLogin = localStorage.getItem('Islogin');
    const loginData = JSON.parse(isLogin);
    console.log('isLogin', loginData);
    const userId = loginData.userid;
    console.log("userId --------- from local", userId)
    const name = loginData.name;
    const username = loginData.username;
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({});
    const [comments, setComments] = useState({});
    const [content, setContent] = useState('');
    const [Userslist, setUserslist] = useState([]);
    const [requestlist, setRequestList] = useState([]);
    const [myfreindlist, setmyFreindlist] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const handleLike = (postid) => {
        console.log("postid handleLike", postid)
        const postId = postid;

        var datapost = {
            postId: postId,
            userId: userId
        }
        axios.post(`http://localhost:8000/like`, datapost)
            .then(response => {
                console.log('Post liked!', response.data);
                fetchData(userId)
            })
            .catch(error => {
                console.error('Error liking post:', error);
            });
        if (!liked) {
            setLikes(likes + 1);
            setLiked(true);
            if (disliked) {
                setDislikes(dislikes - 1);
                setDisliked(false);
            }
        }
    };

    const handleDislike = (postid) => {
        console.log("postid handleDislike", postid)
        const postId = postid;
        var datapost = {
            postId: postId,
            userId: userId
        }
        axios.post(`http://localhost:8000/dislink`, datapost)
            .then(response => {
                // Handle the successful dislike action
                console.log('Post disliked!', response.data);
                fetchData(userId)
            })
            .catch(error => {
                // Handle any errors that occur during the dislike action
                console.error('Error disliking post:', error);
            });
        if (!disliked) {

            setDislikes(dislikes + 1);
            setDisliked(true);
            if (liked) {
                setLikes(likes - 1);
                setLiked(false);
            }
        }
    };
    const handleButtonClick = (userid) => {
        console.log("userid", userid)
        var data = {
            senderId: userId,
            receiverId: userid
        }
        axios.post(`http://localhost:8000/friend-request`, data)
            .then(response => {
                console.log('Post disliked!', response.data);
                fetchData(userId)
            })
            .catch(error => {
                console.error('Error disliking post:', error);
            });
    }

    const handleAcceptClick = (userid) => {
        console.log("userid accept-friend-request", userid)
        alert(userid)
        var data = {
            requestId: userid
        }
        axios.post(`http://localhost:8000/accept-friend-request`, data)
            .then(response => {
                console.log('Post disliked!', response.data);
                fetchData(userId)
            })
            .catch(error => {
                console.error('Error disliking post:', error);
            });
    }




    const handleCommentSubmit = (e, postId) => {
        alert("sas")
        e.preventDefault();
        const commentData = {
            postId: postId,
            commenterName: name, // replace with actual commenter name
            content: content,
            userId: userId
        };

        // Assuming your API endpoint is '/comments'
        axios.post(`http://localhost:8000/comments`, commentData)
            .then((response) => {
                const newComment = response.data;

                // Update the comments state for the specific post
                setComments((prevComments) => ({
                    ...prevComments,
                    [postId]: [...(prevComments[postId] || []), newComment],
                }));
                fetchData(userId)
                setContent('');

            })
            .catch((error) => {
                console.error('Error posting comment:', error);
                // Handle the error appropriately
            });
    };

    const fetchData = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:8000/get-posts?userId=${userId}`);
            const data = response.data;
            console.log("data.post", data)
            setPosts(data); // Store the fetched data in component state

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const fetchUserdata = async (username) => {
        try {
            const response = await axios.get(`http://localhost:8000/get-user?username=${username}`);
            const data = response.data;
            console.log("user data", data)
            setUser(data.result[0]); // Store the fetched data in component state

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchUserdall = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/get-all-user`);
            const data = response.data
            console.log("user data all", data.result)
            setUserslist(data.result);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const requestList = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/my-friend-request?userId=${userId}`);
            const data = response.data
            console.log("requestListl", data)
            setRequestList(data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const myFreindlist = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/myfriend?userId=${userId}`);
            const data = response.data
            console.log("myFreindlist", data)
            setmyFreindlist(data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const handleSearch = () => {

        console.log('Performing search:', searchTerm);
    };

    const filteredPosts = posts.filter((post) =>
        post.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const postsToMap = searchTerm ? filteredPosts : posts;
    useEffect(() => {
        fetchData(userId);
        fetchUserdata(username);
        fetchUserdall()
        requestList()
        myFreindlist()
    }, []);

    return (
        <div>
            <Header />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="card mb-4">
                            <div class="card" >
                                <img src={`http://localhost:8000/${user.profilepic}`} class="card-img-top" alt="Sample Image" />
                                <div class="card-body text-center">
                                    <h5 class="card-title">{name}</h5>
                                    <Link to="/Profile" class="btn btn-primary">View Profile</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5">

                        <header className="mb-4">
                            <div className="mb-4 d-flex link_and_com ">
                                <div className="input-group w-75">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Say Something"
                                        aria-label="Enter search term..."
                                        aria-describedby="button-search"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <button className="btn btn-primary" id="button-search" type="button" onClick={handleSearch}>
                                        search
                                    </button>
                                </div>
                                <div className="ms-auto">
                                    <Link to="/Addnewpost" className="btn btn-primary" id="button-search" type="button">add post</Link>
                                </div>
                            </div>
                        </header>
                        {postsToMap ? postsToMap.map((post) => (
                            <section className="mb-5" key={post.id}>
                                <div className="card bg-light">
                                    <div className="card-body">
                                        <div className="d-flex mb-4">
                                            <div className="flex-shrink-0 img-20">
                                                <img className="rounded-circle " src={`http://localhost:8000/${user.profilepic}`} alt="..." />
                                            </div>
                                            <div className="ms-3">
                                                <h6>{post.name}</h6>
                                                <p>{post.content}</p>
                                            </div>
                                        </div>

                                        <figure className="mb-4">
                                            <img className="img-fluid rounded" src={`http://localhost:8000/${post.imagelink}`} alt="..." />
                                        </figure>
                                        <div className="d-flex mb-4 link_and_com">
                                            <div className="flex-shrink-0" onClick={() => handleLike(post.id)}>
                                                <i className="fas fa-thumbs-up"></i>
                                                {post.likes.length} like
                                            </div>
                                            <div className="ms-3" onClick={() => handleDislike(post.id)}>
                                                <i className="fas fa-thumbs-down"></i>
                                                {post.dislikes.length} dislike
                                            </div>
                                            <div className="ms-3">
                                                <i className="fas fa-comments"></i>
                                                {comments[post.id]?.length || 0} comment
                                            </div>
                                        </div>
                                        {/* Render comments */}
                                        {post.comments.map((comment) => (
                                            <div className="d-flex mb-4" key={comment.id}>
                                                <div className="flex-shrink-0">
                                                    <img className="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." />
                                                </div>
                                                <div className="ms-3">
                                                    <div className="fw-bold">{comment.commenterName}</div>
                                                    {comment.content}
                                                </div>
                                            </div>
                                        ))}
                                        <div className="mb-4" >
                                            <textarea
                                                className="form-control"
                                                rows="3"
                                                placeholder="Join the discussion and leave a comment!"
                                                onChange={(e) => setContent(e.target.value)}
                                            ></textarea>
                                            <button className="btn btn-primary" onClick={(e) => handleCommentSubmit(e, post.id)}>
                                                Post Comment
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )) : null}
                    </div>
                    <div className="col-lg-4">


                        <div className="card mb-4">
                            <div className="card-header"> <ul class="nav nav-tabs" id="myTab">
                                <li class="nav-item">
                                    <a href="#home" class="nav-link active" data-bs-toggle="tab">friends</a>
                                </li>
                                <li class="nav-item">
                                    <a href="#profile" class="nav-link" data-bs-toggle="tab">Friend requests</a>
                                </li>
                                <li class="nav-item">
                                    <a href="#messages" class="nav-link" data-bs-toggle="tab">All Friends</a>
                                </li>
                            </ul></div>
                            <div className="card-body">
                                <div class="tab-content">
                                    <div class="tab-pane fade show active" id="home">
                                        <div className="col-sm-12">

                                            <ul className="list-unstyled mb-0">

                                                {Userslist ? Userslist.map((user) => (
                                                    user.userid !== userId && (
                                                        <li key={user.userId}>
                                                            <a>
                                                                <div className="d-flex mb-4">
                                                                    <div className="flex-shrink-0">
                                                                        <img
                                                                            className="rounded-circle"
                                                                            src="https://dummyimage.com/50x50/ced4da/6c757d.jpg"
                                                                            alt="..."
                                                                        />
                                                                    </div>
                                                                    <div className="ms-3">
                                                                        <div className="name_f">{user.name}</div>
                                                                        <button
                                                                            className="btn btn-info_f text-white"
                                                                            onClick={() => handleButtonClick(user.userid)}
                                                                        >
                                                                            add friends
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                    )
                                                )) : null}

                                            </ul>


                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="profile">
                                        <div className="col-sm-12">

                                            <ul className="list-unstyled mb-0">

                                                {requestlist ? requestlist.map((user) => (
                                                    <li><a>
                                                        <div className="d-flex mb-4">
                                                            <div className="flex-shrink-0">
                                                                <img className="rounded-circle" src={`http://localhost:8000/${user.profilepic}`} alt="..." /></div>
                                                            <div className="ms-3">
                                                                <div className='name_f'>{user.name}</div>
                                                                <button className='btn btn-info_f text-white' onClick={() => handleAcceptClick(user.sender_id)}>
                                                                    add friends
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </a></li>
                                                )) : null}

                                            </ul>


                                        </div>

                                    </div>
                                    <div class="tab-pane fade" id="messages">
                                        <div className="col-sm-12">

                                            <ul className="list-unstyled mb-0">

                                                {myfreindlist ? myfreindlist.map((user) => (
                                                    <li><a>
                                                        <div className="d-flex mb-4">
                                                            <div className="flex-shrink-0">
                                                                <img className="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jpg" alt="..." /></div>
                                                            <div className="ms-3">
                                                                <div className='name_f'>{user.name}</div>
                                                                <button className='btn btn-info_f text-white' onClick={() => handleAcceptClick(user.sender_id)}>
                                                                    add friends
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </a></li>
                                                )) : null}

                                            </ul>


                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>





                        <div className="card mb-4">
                            <div className="card-header">Side Widget</div>
                            <div className="card-body">You can put anything you want inside of these side widgets. They are easy to use, and feature the Bootstrap 5 card component!</div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Home