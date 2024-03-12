import React from 'react'
import './test.css'

const Test = () => {
    return (
        <>

            <div className="breadcrumb-bar-two">
                <div className="container">
                    <div className="row align-items-center inner-banner">
                        <div className="col-md-12 col-12 text-center">
                            <h2 className="breadcrumb-title">Pharmacy Details</h2>
                            <nav aria-label="breadcrumb" className="page-breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <a href="index.html">Home</a>
                                    </li>
                                    <li className="breadcrumb-item" aria-current="page">
                                        Pharmacy Details
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>


            <div className="content" style={{ minHeight: "212.906px" }}>
                <div className="container">
                    <div className="card">
                        <div className="card-body">
                            <div className="doctor-widget">
                                <div className="doc-info-left">
                                    <div className="doctor-img1">
                                        <a href="pharmacy-details.html">
                                            <img
                                                src="	https://doccure.dreamguystech.com/html/template/assets/img/medical-img1.jpg"
                                                className="img-fluid"
                                                alt="User Image"
                                            />
                                        </a>
                                    </div>
                                    <div className="doc-info-cont">
                                        <h4 className="doc-name mb-2">
                                            <a href="pharmacy-details.html">Medlife Medical</a>
                                        </h4>
                                        <div className="rating mb-2">
                                            <span className="badge badge-primary">4.0</span>
                                            <i className="fas fa-star filled" />
                                            <i className="fas fa-star filled" />
                                            <i className="fas fa-star filled" />
                                            <i className="fas fa-star filled" />
                                            <i className="fas fa-star" />
                                            <span className="d-inline-block average-rating">(17)</span>
                                        </div>
                                        <div className="clinic-details">
                                            <div className="clini-infos pt-3">
                                                <p className="doc-location mb-2">
                                                    <i className="fas fa-phone-volume me-1" /> 320-795-8815
                                                </p>
                                                <p className="doc-location mb-2 text-ellipse">
                                                    <i className="fas fa-map-marker-alt me-1" /> 96 Red Hawk
                                                    Road Cyrus, MN 56323{" "}
                                                </p>
                                                <p className="doc-location mb-2">
                                                    <i className="fas fa-chevron-right me-1" /> Chemists,
                                                    Surgical Equipment Dealer
                                                </p>
                                                <p className="doc-location mb-2">
                                                    <i className="fas fa-chevron-right me-1" /> Opens at 08.00
                                                    AM
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="doc-info-right d-flex align-items-center justify-content-center">
                                    <div className="clinic-booking">
                                        <a className="view-pro-btn" href="chat.html">
                                            Send Message
                                        </a>
                                        <a
                                            className="apt-btn"
                                            href="#"
                                            data-bs-toggle="modal"
                                            data-bs-target="#voice_call"
                                        >
                                            Call Now
                                        </a>
                                        <a href="product-all.html" className="view-pro-btn">
                                            Browse Products
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body pt-0">
                            <nav className="user-tabs mb-4">
                                <ul
                                    className="nav nav-tabs nav-tabs-bottom nav-justified"
                                    role="tablist"
                                >
                                    <li className="nav-item" role="presentation">
                                        <a
                                            className="nav-link"
                                            href="#doc_overview"
                                            data-bs-toggle="tab"
                                            aria-selected="false"
                                            role="tab"
                                            tabIndex={-1}
                                        >
                                            Overview
                                        </a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a
                                            className="nav-link"
                                            href="#doc_locations"
                                            data-bs-toggle="tab"
                                            aria-selected="false"
                                            role="tab"
                                            tabIndex={-1}
                                        >
                                            Locations
                                        </a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a
                                            className="nav-link"
                                            href="#doc_reviews"
                                            data-bs-toggle="tab"
                                            aria-selected="false"
                                            role="tab"
                                            tabIndex={-1}
                                        >
                                            Reviews
                                        </a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a
                                            className="nav-link active"
                                            href="#doc_business_hours"
                                            data-bs-toggle="tab"
                                            aria-selected="true"
                                            role="tab"
                                        >
                                            Business Hours
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                            <div className="tab-content pt-0">
                                <div role="tabpanel" id="doc_overview" className="tab-pane fade">
                                    <div className="row">
                                        <div className="col-md-9">
                                            <div className="widget about-widget">
                                                <h4 className="widget-title">About Me</h4>
                                                <p>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                                    do eiusmod tempor incididunt ut labore et dolore magna
                                                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                                    Duis aute irure dolor in reprehenderit in voluptate velit
                                                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                                                    occaecat cupidatat non proident, sunt in culpa qui officia
                                                    deserunt mollit anim id est laborum.
                                                </p>
                                            </div>
                                            <div className="widget awards-widget">
                                                <h4 className="widget-title">Awards</h4>
                                                <div className="experience-box">
                                                    <ul className="experience-list">
                                                        <li>
                                                            <div className="experience-user">
                                                                <div className="before-circle" />
                                                            </div>
                                                            <div className="experience-content">
                                                                <div className="timeline-content">
                                                                    <p className="exp-year">July 2019</p>
                                                                    <h4 className="exp-title">Humanitarian Award</h4>
                                                                    <p>
                                                                        Lorem ipsum dolor sit amet, consectetur adipiscing
                                                                        elit. Proin a ipsum tellus. Interdum et malesuada
                                                                        fames ac ante ipsum primis in faucibus.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="experience-user">
                                                                <div className="before-circle" />
                                                            </div>
                                                            <div className="experience-content">
                                                                <div className="timeline-content">
                                                                    <p className="exp-year">March 2011</p>
                                                                    <h4 className="exp-title">
                                                                        Certificate for International Volunteer Service
                                                                    </h4>
                                                                    <p>
                                                                        Lorem ipsum dolor sit amet, consectetur adipiscing
                                                                        elit. Proin a ipsum tellus. Interdum et malesuada
                                                                        fames ac ante ipsum primis in faucibus.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="experience-user">
                                                                <div className="before-circle" />
                                                            </div>
                                                            <div className="experience-content">
                                                                <div className="timeline-content">
                                                                    <p className="exp-year">May 2008</p>
                                                                    <h4 className="exp-title">
                                                                        The Dental Professional of The Year Award
                                                                    </h4>
                                                                    <p>
                                                                        Lorem ipsum dolor sit amet, consectetur adipiscing
                                                                        elit. Proin a ipsum tellus. Interdum et malesuada
                                                                        fames ac ante ipsum primis in faucibus.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div role="tabpanel" id="doc_locations" className="tab-pane fade">
                                    <div className="location-list">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="clinic-content">
                                                    <h4 className="clinic-name">
                                                        <a href="#">Medlife Medical</a>
                                                    </h4>
                                                    <div className="rating">
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star" />
                                                        <span className="d-inline-block average-rating">(4)</span>
                                                    </div>
                                                    <div className="clinic-details mb-0">
                                                        <h5 className="clinic-direction">
                                                            {" "}
                                                            <i className="fas fa-map-marker-alt" /> 96 Red Hawk Road
                                                            Cyrus, MN 56323 <br />
                                                            <a href="javascript:void(0);">Get Directions</a>
                                                        </h5>
                                                        <ul>
                                                            <li>
                                                                <a
                                                                    href="assets/img/features/feature-01.jpg"
                                                                    data-fancybox="gallery2"
                                                                >
                                                                    <img
                                                                        src="	https://doccure.dreamguystech.com/html/template/assets/img/features/feature-01.jpg"
                                                                        alt="Feature Image"
                                                                    />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    href="assets/img/features/feature-02.jpg"
                                                                    data-fancybox="gallery2"
                                                                >
                                                                    <img
                                                                        src="https://doccure.dreamguystech.com/html/template/assets/img/features/feature-01.jpg"
                                                                        alt="Feature Image"
                                                                    />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    href="assets/img/features/feature-03.jpg"
                                                                    data-fancybox="gallery2"
                                                                >
                                                                    <img
                                                                        src="https://doccure.dreamguystech.com/html/template/assets/img/features/feature-01.jpg"
                                                                        alt="Feature Image"
                                                                    />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    href="assets/img/features/feature-04.jpg"
                                                                    data-fancybox="gallery2"
                                                                >
                                                                    <img
                                                                        src="https://doccure.dreamguystech.com/html/template/assets/img/features/feature-01.jpg"
                                                                        alt="Feature Image"
                                                                    />
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="clinic-timing">
                                                    <div>
                                                        <p className="timings-days">
                                                            <span> Mon - Sat </span>
                                                        </p>
                                                        <p className="timings-times">
                                                            <span>10:00 AM - 2:00 PM</span>
                                                            <span>4:00 PM - 9:00 PM</span>
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="timings-days">
                                                            <span>Sun</span>
                                                        </p>
                                                        <p className="timings-times">
                                                            <span>10:00 AM - 2:00 PM</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="location-list">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="clinic-content">
                                                    <h4 className="clinic-name">
                                                        <a href="#">Medlife Medical</a>
                                                    </h4>
                                                    <div className="rating">
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star filled" />
                                                        <i className="fas fa-star" />
                                                        <span className="d-inline-block average-rating">(4)</span>
                                                    </div>
                                                    <div className="clinic-details mb-0">
                                                        <p className="clinic-direction">
                                                            {" "}
                                                            <i className="fas fa-map-marker-alt" /> 310 Cambridge
                                                            Drive New River, AZ 85020 <br />
                                                            <a href="javascript:void(0);">Get Directions</a>
                                                        </p>
                                                        <ul>
                                                            <li>
                                                                <a
                                                                    href="assets/img/features/feature-01.jpg"
                                                                    data-fancybox="gallery2"
                                                                >
                                                                    <img
                                                                        src="https://doccure.dreamguystech.com/html/template/assets/img/features/feature-01.jpg"
                                                                        alt="Feature Image"
                                                                    />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    href="assets/img/features/feature-02.jpg"
                                                                    data-fancybox="gallery2"
                                                                >
                                                                    <img
                                                                        src="https://doccure.dreamguystech.com/html/template/assets/img/features/feature-01.jpg"
                                                                        alt="Feature Image"
                                                                    />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    href="assets/img/features/feature-03.jpg"
                                                                    data-fancybox="gallery2"
                                                                >
                                                                    <img
                                                                        src="https://doccure.dreamguystech.com/html/template/assets/img/features/feature-01.jpg"
                                                                        alt="Feature Image"
                                                                    />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a
                                                                    href="assets/img/features/feature-04.jpg"
                                                                    data-fancybox="gallery2"
                                                                >
                                                                    <img
                                                                        src="https://doccure.dreamguystech.com/html/template/assets/img/features/feature-01.jpg"
                                                                        alt="Feature Image"
                                                                    />
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="clinic-timing">
                                                    <div>
                                                        <p className="timings-days">
                                                            <span> Tue - Fri </span>
                                                        </p>
                                                        <p className="timings-times">
                                                            <span>11:00 AM - 1:00 PM</span>
                                                            <span>6:00 PM - 11:00 PM</span>
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="timings-days">
                                                            <span>Sat - Sun</span>
                                                        </p>
                                                        <p className="timings-times">
                                                            <span>8:00 AM - 10:00 AM</span>
                                                            <span>3:00 PM - 7:00 PM</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div role="tabpanel" id="doc_reviews" className="tab-pane fade">
                                    <div className="widget review-listing">
                                        <ul className="comments-list">
                                            <li>
                                                <div className="comment">
                                                    <img
                                                        className="avatar avatar-sm rounded-circle"
                                                        alt="User Image"
                                                        src="assets/img/patients/patient.jpg"
                                                    />
                                                    <div className="comment-body">
                                                        <div className="meta-data">
                                                            <span className="comment-author">Armando Pack</span>
                                                            <span className="comment-date">
                                                                Reviewed 2 Days ago
                                                            </span>
                                                            <div className="review-count rating">
                                                                <i className="fas fa-star filled" />
                                                                <i className="fas fa-star filled" />
                                                                <i className="fas fa-star filled" />
                                                                <i className="fas fa-star filled" />
                                                                <i className="fas fa-star" />
                                                            </div>
                                                        </div>
                                                        <p className="recommended">
                                                            <i className="far fa-thumbs-up" /> I recommend the
                                                            doctor
                                                        </p>
                                                        <p className="comment-content">
                                                            Lorem ipsum dolor sit amet, consectetur adipisicing
                                                            elit, sed do eiusmod tempor incididunt ut labore et
                                                            dolore magna aliqua. Ut enim ad minim veniam, quis
                                                            nostrud exercitation. Curabitur non nulla sit amet nisl
                                                            tempus
                                                        </p>
                                                        <div className="comment-reply">
                                                            <a className="comment-btn" href="#">
                                                                <i className="fas fa-reply" /> Reply
                                                            </a>
                                                            <p className="recommend-btn">
                                                                <span>Recommend?</span>
                                                                <a href="#" className="like-btn">
                                                                    <i className="far fa-thumbs-up" /> Yes
                                                                </a>
                                                                <a href="#" className="dislike-btn">
                                                                    <i className="far fa-thumbs-down" /> No
                                                                </a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <ul className="comments-reply">
                                                    <li>
                                                        <div className="comment">
                                                            <img
                                                                className="avatar avatar-sm rounded-circle"
                                                                alt="User Image"
                                                                src="assets/img/patients/patient1.jpg"
                                                            />
                                                            <div className="comment-body">
                                                                <div className="meta-data">
                                                                    <span className="comment-author">
                                                                        Lindsey Kesterson
                                                                    </span>
                                                                    <span className="comment-date">
                                                                        Reviewed 3 Days ago
                                                                    </span>
                                                                    <div className="review-count rating">
                                                                        <i className="fas fa-star filled" />
                                                                        <i className="fas fa-star filled" />
                                                                        <i className="fas fa-star filled" />
                                                                        <i className="fas fa-star filled" />
                                                                        <i className="fas fa-star" />
                                                                    </div>
                                                                </div>
                                                                <p className="comment-content">
                                                                    Lorem ipsum dolor sit amet, consectetur adipisicing
                                                                    elit, sed do eiusmod tempor incididunt ut labore et
                                                                    dolore magna aliqua. Ut enim ad minim veniam.
                                                                    Curabitur non nulla sit amet nisl tempus
                                                                </p>
                                                                <div className="comment-reply">
                                                                    <a className="comment-btn" href="#">
                                                                        <i className="fas fa-reply" /> Reply
                                                                    </a>
                                                                    <p className="recommend-btn">
                                                                        <span>Recommend?</span>
                                                                        <a href="#" className="like-btn">
                                                                            <i className="far fa-thumbs-up" /> Yes
                                                                        </a>
                                                                        <a href="#" className="dislike-btn">
                                                                            <i className="far fa-thumbs-down" /> No
                                                                        </a>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <div className="comment">
                                                    <img
                                                        className="avatar avatar-sm rounded-circle"
                                                        alt="User Image"
                                                        src="assets/img/patients/patient2.jpg"
                                                    />
                                                    <div className="comment-body">
                                                        <div className="meta-data">
                                                            <span className="comment-author">Travis Trimble</span>
                                                            <span className="comment-date">
                                                                Reviewed 4 Days ago
                                                            </span>
                                                            <div className="review-count rating">
                                                                <i className="fas fa-star filled" />
                                                                <i className="fas fa-star filled" />
                                                                <i className="fas fa-star filled" />
                                                                <i className="fas fa-star filled" />
                                                                <i className="fas fa-star" />
                                                            </div>
                                                        </div>
                                                        <p className="comment-content">
                                                            Lorem ipsum dolor sit amet, consectetur adipisicing
                                                            elit, sed do eiusmod tempor incididunt ut labore et
                                                            dolore magna aliqua. Ut enim ad minim veniam, quis
                                                            nostrud exercitation. Curabitur non nulla sit amet nisl
                                                            tempus
                                                        </p>
                                                        <div className="comment-reply">
                                                            <a className="comment-btn" href="#">
                                                                <i className="fas fa-reply" /> Reply
                                                            </a>
                                                            <p className="recommend-btn">
                                                                <span>Recommend?</span>
                                                                <a href="#" className="like-btn">
                                                                    <i className="far fa-thumbs-up" /> Yes
                                                                </a>
                                                                <a href="#" className="dislike-btn">
                                                                    <i className="far fa-thumbs-down" /> No
                                                                </a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                        <div className="all-feedback text-center">
                                            <a href="#" className="btn btn-primary btn-sm">
                                                Show all feedback <strong>(167)</strong>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="write-review">
                                        <h4>
                                            Write a review for <strong>Medlife Medical</strong>
                                        </h4>
                                        <form>
                                            <div className="form-group">
                                                <label>Review</label>
                                                <div className="star-rating">
                                                    <input
                                                        id="star-5"
                                                        type="radio"
                                                        name="rating"
                                                        defaultValue="star-5"
                                                    />
                                                    <label htmlFor="star-5" title="5 stars">
                                                        <i className="active fa fa-star" />
                                                    </label>
                                                    <input
                                                        id="star-4"
                                                        type="radio"
                                                        name="rating"
                                                        defaultValue="star-4"
                                                    />
                                                    <label htmlFor="star-4" title="4 stars">
                                                        <i className="active fa fa-star" />
                                                    </label>
                                                    <input
                                                        id="star-3"
                                                        type="radio"
                                                        name="rating"
                                                        defaultValue="star-3"
                                                    />
                                                    <label htmlFor="star-3" title="3 stars">
                                                        <i className="active fa fa-star" />
                                                    </label>
                                                    <input
                                                        id="star-2"
                                                        type="radio"
                                                        name="rating"
                                                        defaultValue="star-2"
                                                    />
                                                    <label htmlFor="star-2" title="2 stars">
                                                        <i className="active fa fa-star" />
                                                    </label>
                                                    <input
                                                        id="star-1"
                                                        type="radio"
                                                        name="rating"
                                                        defaultValue="star-1"
                                                    />
                                                    <label htmlFor="star-1" title="1 star">
                                                        <i className="active fa fa-star" />
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label>Title of your review</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="If you could say it in one sentence, what would you say?"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Your review</label>
                                                <textarea
                                                    id="review_desc"
                                                    maxLength={100}
                                                    className="form-control"
                                                    defaultValue={""}
                                                />
                                                <div className="d-flex justify-content-between mt-3">
                                                    <small className="text-muted">
                                                        <span id="chars">100</span> characters remaining
                                                    </small>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="form-group">
                                                <div className="terms-accept">
                                                    <div className="custom-checkbox">
                                                        <input type="checkbox" id="terms_accept" />
                                                        <label className='ms-2' htmlFor="terms_accept">
                                                            I have read and accept{" "}
                                                            <a href="#">Terms &amp; Conditions</a>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="submit-section">
                                                <button type="submit" className="btn btn-primary submit-btn">
                                                    Add Review
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div
                                    role="tabpanel"
                                    id="doc_business_hours"
                                    className="tab-pane fade active show"
                                >
                                    <div className="row">
                                        <div className="col-md-6 offset-md-3">
                                            <div className="widget business-widget">
                                                <div className="widget-content">
                                                    <div className="listing-hours">
                                                        <div className="listing-day current">
                                                            <div className="day">
                                                                Today <span>5 Nov 2019</span>
                                                            </div>
                                                            <div className="time-items">
                                                                <span className="open-status">
                                                                    <span className="badge bg-success-light">
                                                                        Open Now
                                                                    </span>
                                                                </span>
                                                                <span className="time">07:00 AM - 09:00 PM</span>
                                                            </div>
                                                        </div>
                                                        <div className="listing-day">
                                                            <div className="day">Monday</div>
                                                            <div className="time-items">
                                                                <span className="time">07:00 AM - 09:00 PM</span>
                                                            </div>
                                                        </div>
                                                        <div className="listing-day">
                                                            <div className="day">Tuesday</div>
                                                            <div className="time-items">
                                                                <span className="time">07:00 AM - 09:00 PM</span>
                                                            </div>
                                                        </div>
                                                        <div className="listing-day">
                                                            <div className="day">Wednesday</div>
                                                            <div className="time-items">
                                                                <span className="time">07:00 AM - 09:00 PM</span>
                                                            </div>
                                                        </div>
                                                        <div className="listing-day">
                                                            <div className="day">Thursday</div>
                                                            <div className="time-items">
                                                                <span className="time">07:00 AM - 09:00 PM</span>
                                                            </div>
                                                        </div>
                                                        <div className="listing-day">
                                                            <div className="day">Friday</div>
                                                            <div className="time-items">
                                                                <span className="time">07:00 AM - 09:00 PM</span>
                                                            </div>
                                                        </div>
                                                        <div className="listing-day">
                                                            <div className="day">Saturday</div>
                                                            <div className="time-items">
                                                                <span className="time">07:00 AM - 09:00 PM</span>
                                                            </div>
                                                        </div>
                                                        <div className="listing-day closed">
                                                            <div className="day">Sunday</div>
                                                            <div className="time-items">
                                                                <span className="time">
                                                                    <span className="badge bg-danger-light">
                                                                        Closed
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </>

    )
}

export default Test