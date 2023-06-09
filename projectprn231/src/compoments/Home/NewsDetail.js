import React, { Component } from "react";
import { useParams } from 'react-router-dom';
import { withRouter } from "react-router-dom/cjs/react-router-dom";
import "./home.css"
import Header from "./Header";
import { Route } from "react-router-dom";
import SaveNews from "../User/SaveNews";
import jwtDecode from "jwt-decode";
class NewsDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ListGenre: [],
            news: null, // Sản phẩm được chọn
            loading: true,
            object: {},
            NewsSeenid: 1,
            addDate: null,
            newsId: null,
            cateId: null,
        };
    }

    addNewsSeen() {
        const {NewsSeenid , addDate , cateId, NewsId ,userid } = this.state;
       
        const url = 'https://localhost:7248/api/News/AddNewsSeen';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ NewsSeenid, addDate , userid , NewsId , cateId})
        })
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData); // Xử lý dữ liệu phản hồi từ API (nếu cần thiết)
            })
            .catch(error => {
                console.error(error);
            });

    }
    addNewsSave() {
        const {NewsSeenid , addDate , cateId, NewsId ,userid } = this.state;
        const url = 'https://localhost:7248/api/News/AddNewsSave';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ NewsSeenid, addDate , userid , NewsId , cateId})
        })
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData); // Xử lý dữ liệu phản hồi từ API (nếu cần thiết)
            })
            .catch(error => {
                console.error(error);
            });

    }

    refreshListGenre() {
        fetch("https://localhost:7248/api/News/getAllGenres")
            .then(response => response.json())
            .then(data => {
                this.setState({ ListGenre: data });
            });
    }

    refeshListDataById() {
        const { id } = this.props.match.params;
        fetch(`https://localhost:7248/api/News/getNewsById?id=${id}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ object: data });
            })
            .catch(error => {
                console.error('Error fetching object:', error);
            });
    }
    handleClick = () => {
       
        this.setState({ cateId : 2 });
        const token = localStorage.getItem("token");
        if (token != null) {
            const { id } = this.props.match.params;
            const decodedToken = jwtDecode(token);
            const NewsId = id;
            const userid = decodedToken.id;
            const NewsSeenid = this.state;
            const addDate = new Date().toISOString().slice(0, 16);
            const cateId = 2;
            this.setState({userid,NewsSeenid ,addDate,NewsId,cateId}, () => {
                this.addNewsSave();
            });
           


            // this.setState({nameUser : decodedToken.FullName});
        }
    };

    componentDidMount() {
        this.refreshListGenre();
        this.refeshListDataById();
        const token = localStorage.getItem("token");
     
        if (token != null) {
            const { id } = this.props.match.params;
            const decodedToken = jwtDecode(token);
            const NewsId = id;
            const userid = decodedToken.id;
            const NewsSeenid = this.state;
            const addDate = new Date().toISOString().slice(0, 16);
            const cateId = 1;
            this.setState({userid,NewsSeenid ,addDate,NewsId,cateId}, () => {
                this.addNewsSeen();
            });
           


            // this.setState({nameUser : decodedToken.FullName});
        }
    }

    render() {
        const { object, ListGenre ,cateId} = this.state;
        console.log(cateId);
        return (
            <div>
                <div className="App">
                    <Header />

                    <div id="content-wrapper">
                  
                        <div id="main">
                            <div id="">
                                <div id="new-detail">


                                    <h2 class="heading">Featured Story</h2>
                                    <button onClick={this.handleClick}>Click me</button>
                                    <p class="author">{object.content} | <span>{object.createDate}</span></p>
                                    <h1 class="title-detail">{object.title}</h1> 
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png" alt="" />
                                    <p>{object.description}</p>  
                                    <p>{object.content}</p>  
                                    <a> <i class="bi bi-save-fill"></i></a>

                                </div>

                            </div>
                            <div>

                            
                            <section class="content-item" id="comments">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <form>
                                                <h3 class="pull-left">New Comment</h3>
                                               
                                                <fieldset>
                                                    <div class="row">
                                                        <div class="col-sm-3 col-lg-2 hidden-xs">
                                                            {/* <img class="img-responsive" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" /> */}
                                                        </div>
                                                        <div class="form-group col-xs-12 col-sm-9 col-lg-10">
                                                            <textarea class="form-control" id="message" placeholder="Your message" required=""></textarea>
                                                        </div>
                                                    </div>
                                                </fieldset>
                                                <button type="submit" class="btn btn-normal pull-right">Submit</button>
                                            </form>

                                            <h3>Comments</h3>


                                            <div class="media">
                                                <a class="pull-left" href="#"><img class="media-object" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" /></a>
                                                <div class="media-body">
                                                    <h4 class="media-heading">John Doe</h4>
                                                    <p>ds</p>
                                                    <ul class="list-unstyled list-inline media-detail pull-left">
                                                        <li><i class="fa fa-calendar"></i>27/02/2014</li>
                                                        <li><i class="fa fa-thumbs-up"></i>13</li>
                                                    </ul>
                                                    <ul class="list-unstyled list-inline media-detail pull-right">
                                                        {/* <li class=""><a href="">Like</a></li>
                                                        <li class=""><a href="">Reply</a></li> */}
                                                    </ul>
                                                </div>
                                            </div>

                                           
                                        </div>
                                    </div>
                                </div>
                            </section>
                            </div>
                           
                        </div>

                    </div>


                </div>
                <div id="extras">
                    <div id="recommended">
                        <h2 class="heading">Recommended Stories</h2>
                        <ul>

                            <li><a href="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit &raquo;</a></li>
                            <li><a href="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit &raquo;</a></li>
                            <li><a href="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit &raquo;</a></li>
                            <li class="last"><a href="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit &raquo;</a></li>
                        </ul>
                    </div>
                    <div id="programs">
                        <h2 class="heading">What's On Tonight</h2>
                        <img src="img/rick.jpg" alt="" /> <img src="img/cbc.png" alt="" />
                    </div>
                    <div id="cartoon">
                        <h2 class="heading">Humour</h2>
                        <img src="img/cartoon.jpg" alt="" />
                    </div>
                </div>
                <div id="footer">
                    <ul>
                        <li>&copy;2010 <a href="#">Name Here</a></li>
                        <li>|</li>
                        <li><a href="#">FAQ</a></li>
                        <li>|</li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li>|</li>
                        <li><a href="#">Careers</a></li>
                        <li>|</li>
                        <li><a href="#">Advertise</a></li>
                        <li>|</li>
                        <li><a href="#">Sitemap</a></li>
                        <li>|</li>
                        <li>Designed by <a href="http://www.skyrocketlabs.com/">Skyrocket Labs</a></li>
                    </ul>
                </div>
                <div className="Content">
                <Route path="/savenews" component={SaveNews}/>
                </div>
            </div>


        )
    }
}
export default withRouter(NewsDetail);