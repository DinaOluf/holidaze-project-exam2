import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useApi from "../functions/useApi";
import { Loader } from "../styles/loader.styles";
import PlaceholderImg from "../../assets/images/placeholder-image.png";
import PersonIcon from "../../assets/images/person-icon.png";
import WifiIcon from "../../assets/images/wifi-icon.png";
import ParkingIcon from "../../assets/images/parking-icon.png";
import FoodIcon from "../../assets/images/breakfast-icon.png";
import PetsIcon from "../../assets/images/pets-icon.png";
import ProfileImg from "../../assets/images/profile-icon.png";
import {
  DateInput,
  InputGuests,
  PersonIconStyle,
  VenueImgContainer,
  ServicesIcons,
} from "../styles/venue.styling";
import { ProfileImgStyle } from "../styles/icons.styles";
import {
  Button,
  Button2,
  ButtonSmaller,
  ButtonSmaller2,
} from "../styles/buttons.styles";
import { formatDate } from "../functions/timeDate";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Check, Error, Input2, TextArea } from "../styles/form.styles";
import { confirmAlert } from "react-confirm-alert";
import { Links } from "../styles/links.style";
import "react-datepicker/dist/react-datepicker.css";
import DocumentMeta from "react-document-meta";

const schema = yup
  .object({
    dateArrival: yup
      .string()
      .matches(
        /(^0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4}$)/,
        "Must match date format"
      ),
    dateDeparture: yup
      .string()
      .matches(
        /(^0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4}$)/,
        "Must match date format"
      ),
    numberGuests: yup
      .number()
      .required("Please choose a date")
      .min(1, "Must be at least 1"),
  })
  .required();

const venueSchema = yup
  .object()
  .shape(
    {
      name: yup
        .string()
        .required("Please enter name of venue")
        .typeError("Please enter name of venue")
        .min(3, "Must contain at least 3 characters"),
      description: yup
        .string()
        .required("Please enter a description")
        .typeError("Please enter a description")
        .min(20, "Must contain at least 20 characters")
        .max(2500, "Max 2500 characters"),
      media: yup.string().when("media", {
        is: null || "",
        then: () => yup.string().nullable(),
        otherwise: () =>
          yup
            .string()
            .matches(
              /(http)?s?:?(\/\/[^"']*\.(?:jpg|jpeg|gif|png|svg))/ |
                "https://source.unsplash.com/1600x900/?hotel",
              "Must be a direct image link"
            ),
      }),
      price: yup
        .number()
        .typeError("Please enter a number")
        .required("Please enter price per night")
        .min(1, "Must be at least 1 kr"),
      maxGuests: yup
        .number()
        .typeError("Please enter a number")
        .required("Please enter maximum amount of guests")
        .min(1, "Must be at least 1 guest")
        .max(100, "Max 100 guests"),
      wifi: yup.boolean(),
      parking: yup.boolean(),
      breakfast: yup.boolean(),
      pets: yup.boolean(),
    },
    [["media", "media"]]
  )
  .required();

function VenuePage() {
  let params = useParams();
  const navigate = useNavigate();
  const [venueName, setVenueName] = useState("");
  const date = new Date();
  const [arrivalDate, setArrivalDate] = useState(date);
  const [departureDate, setDepartureDate] = useState(
    new Date(arrivalDate.getTime() + 86400000)
  );
  const userName = localStorage.getItem("Name");

  const { data, isLoading, isError } = useApi(
    "https://api.noroff.dev/api/v1/holidaze/venues/" +
      params.id +
      "?_owner=true&_bookings=true",
    "GET"
  );

  useEffect(() => {
    setVenueName(data.name);
  }, [data]);

  const meta = {
    title: `Holidaze | Venue | ${venueName}`,
    description:
      "Holidaze is an accommodation website where you can book venues for specific dates. View and book an amazing venue for your holiday today!",
    meta: {
      charset: "utf-8",
      name: {
        keywords:
          "holidaze, accommodation, venues, hotels, housing, react, rent, booking, vacation, holiday",
      },
    },
  };

  const {
    register: regBook,
    handleSubmit: handleBook,
    formState: { errors: errorsBook },
    reset: resetBook,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    register: regEdit,
    handleSubmit: handleEdit,
    formState: { errors: errorsEdit },
    reset: resetEdit,
  } = useForm({
    resolver: yupResolver(venueSchema),
  });

  if (isLoading) {
    return (
      <main id="container d-flex flex-column p-5">
        <div className="d-flex justify-content-center mt-4">
          <Loader className="spinner-grow text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </Loader>
        </div>
      </main>
    );
  }

  if (isError || data.errors) {
    return (
      <main id="container d-flex flex-column p-5">
        {data.errors ? (
          <div className="d-flex justify-content-center mt-4">
            {data.errors[0].message}. Please try again later.
          </div>
        ) : (
          <div className="d-flex justify-content-center mt-4">
            An error occurred. Please try again later.
          </div>
        )}
      </main>
    );
  }

  const bookings = data.bookings;

  const onClickConfirm = async (e) => {
    confirmAlert({
      title: "Delete venue",
      message: "Are you sure you want to delete this venue?",
      buttons: [
        {
          label: "Yes",
          onClick: () => onDeleteHandler(e),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const onDeleteHandler = async (id) => {
    const url = "https://api.noroff.dev/api/v1/holidaze/venues/" + id;
    const token = localStorage.getItem("Token");

    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await fetch(url, options);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const onEditHandler = async (e) => {
    const url = `https://api.noroff.dev/api/v1/holidaze/venues/${params.id}`;
    const token = localStorage.getItem("Token");

    let newData = {
      name: e.name,
      description: e.description,
      media: [e.media],
      price: e.price,
      maxGuests: e.maxGuests,
      meta: {
        wifi: e.wifi,
        parking: e.parking,
        breakfast: e.breakfast,
        pets: e.pets,
      },
    };

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newData),
    };

    try {
      const response = await fetch(url, options);
      const json = await response.json();
      if (json.name) {
        resetEdit();
        window.location.reload();
      }
      if (json.errors) {
        alert(json.errors[0].message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDaysArray = function (bookings) {
    let arr = [];
    for (let i = 0; i < bookings.length; i++) {
      for (
        let dt = new Date(bookings[i].dateFrom);
        dt <= new Date(bookings[i].dateTo);
        dt.setDate(dt.getDate() + 1)
      ) {
        arr.push(new Date(dt));
      }
    }
    return arr;
  };

  const onSubmitHandler = async (e) => {
    const url = "https://api.noroff.dev/api/v1/holidaze/bookings";
    const token = localStorage.getItem("Token");

    let newData = {
      dateFrom: arrivalDate,
      dateTo: departureDate,
      guests: e.numberGuests,
      venueId: data.id,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newData),
    };

    try {
      const response = await fetch(url, options);
      const json = await response.json();
      if (json.id) {
        resetBook();
        navigate("/booked-success");
      }
      if (json.errors) {
        alert(json.errors[0].message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DocumentMeta {...meta} />
      <main id="container p-5">
        <div className="d-flex justify-content-center mt-4">
          <div className="col-11 col-sm-9 col-xl-7 rounded-5 overflow-hidden pb-4">
            <div
              id="carouselIndicators"
              className="carousel slide"
              data-bs-ride="true"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselIndicators"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                {data.media && data.media.length >= 2 ? (
                  <button
                    type="button"
                    data-bs-target="#carouselIndicators"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                ) : (
                  ""
                )}
                {data.media && data.media.length >= 3 ? (
                  <button
                    type="button"
                    data-bs-target="#carouselIndicators"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                ) : (
                  ""
                )}
                {data.media && data.media.length >= 4 ? (
                  <button
                    type="button"
                    data-bs-target="#carouselIndicators"
                    data-bs-slide-to="3"
                    aria-label="Slide 4"
                  ></button>
                ) : (
                  ""
                )}
                {data.media && data.media.length >= 5 ? (
                  <button
                    type="button"
                    data-bs-target="#carouselIndicators"
                    data-bs-slide-to="4"
                    aria-label="Slide 5"
                  ></button>
                ) : (
                  ""
                )}
              </div>
              <div className="carousel-inner">
                {data.media && data.media.length >= 1 ? (
                  <VenueImgContainer className="carousel-item active">
                    <img
                      src={data.media[0]}
                      className="d-block w-100"
                      alt="accommodation"
                      onError={(e) => {
                        if (e.target.src !== PlaceholderImg) {
                          e.target.onerror = null;
                          e.target.src = PlaceholderImg;
                        }
                      }}
                    />
                  </VenueImgContainer>
                ) : (
                  <VenueImgContainer className="carousel-item active">
                    <img
                      src={PlaceholderImg}
                      className="d-block w-100"
                      alt="accommodation"
                    />
                  </VenueImgContainer>
                )}
                {data.media && data.media.length >= 2 ? (
                  <VenueImgContainer className="carousel-item">
                    <img
                      src={data.media[1]}
                      className="d-block w-100"
                      alt="accommodation"
                      onError={(e) => {
                        if (e.target.src !== PlaceholderImg) {
                          e.target.onerror = null;
                          e.target.src = PlaceholderImg;
                        }
                      }}
                    />
                  </VenueImgContainer>
                ) : (
                  ""
                )}
                {data.media && data.media.length >= 3 ? (
                  <VenueImgContainer className="carousel-item">
                    <img
                      src={data.media[2]}
                      className="d-block w-100"
                      alt="accommodation"
                      onError={(e) => {
                        if (e.target.src !== PlaceholderImg) {
                          e.target.onerror = null;
                          e.target.src = PlaceholderImg;
                        }
                      }}
                    />
                  </VenueImgContainer>
                ) : (
                  ""
                )}
                {data.media && data.media.length >= 4 ? (
                  <VenueImgContainer className="carousel-item">
                    <img
                      src={data.media[3]}
                      className="d-block w-100"
                      alt="accommodation"
                      onError={(e) => {
                        if (e.target.src !== PlaceholderImg) {
                          e.target.onerror = null;
                          e.target.src = PlaceholderImg;
                        }
                      }}
                    />
                  </VenueImgContainer>
                ) : (
                  ""
                )}
                {data.media && data.media.length >= 5 ? (
                  <VenueImgContainer className="carousel-item">
                    <img
                      src={data.media[4]}
                      className="d-block w-100"
                      alt="accommodation"
                      onError={(e) => {
                        if (e.target.src !== PlaceholderImg) {
                          e.target.onerror = null;
                          e.target.src = PlaceholderImg;
                        }
                      }}
                    />
                  </VenueImgContainer>
                ) : (
                  ""
                )}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselIndicators"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselIndicators"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            <div className="d-flex flex-column">
              <div className="row mt-4">
                <h1 className="col-9 col-sm-10">{data.name}</h1>
                <div className="col-3 col-sm-2 text-end">
                  <span className="fs-4">{data.maxGuests}</span>
                  <PersonIconStyle src={PersonIcon} alt="Person icon" />
                </div>
              </div>
              <div className="fs-5 mb-4">{data.price},- per night</div>
              {userName ? (
                <form
                  className="d-flex justify-content-between flex-wrap gap-2"
                  onSubmit={handleBook(onSubmitHandler)}
                >
                  <div className="col d-flex justify-content-evenly">
                    <div className="d-flex flex-column fs-5">
                      <label htmlFor="dateArrival">Date of arrival</label>
                      {bookings ? (
                        <DateInput
                          className="text-center"
                          id="dateArrival"
                          {...regBook("dateArrival").value}
                          selected={arrivalDate}
                          onChange={(date) => setArrivalDate(date)}
                          type="date"
                          minDate={date}
                          excludeDates={getDaysArray(bookings)}
                          dateFormat={`dd/MM/yyyy`}
                          defaultValue={arrivalDate.toISOString()}
                          calendarStartDay={1}
                        ></DateInput>
                      ) : (
                        <Loader />
                      )}
                      <Error>{errorsBook.dateArrival?.message}</Error>
                    </div>
                    <div className="d-flex flex-column fs-5">
                      <label htmlFor="dateDeparture">Date of departure</label>
                      {bookings ? (
                        <DateInput
                          className="text-center"
                          id="dateDeparture"
                          {...regBook("dateDeparture").value}
                          selected={departureDate}
                          onChange={(date) => setDepartureDate(date)}
                          type="date"
                          minDate={new Date(arrivalDate.getTime() + 86400000)}
                          excludeDates={getDaysArray(bookings)}
                          dateFormat="dd/MM/yyyy"
                          defaultValue={departureDate.toISOString()}
                          calendarStartDay={1}
                        ></DateInput>
                      ) : (
                        <Loader />
                      )}
                      <Error>{errorsBook.dateDeparture?.message}</Error>
                    </div>
                  </div>
                  <div className="col d-flex justify-content-evenly align-items-center">
                    <div className="d-flex flex-column fs-5">
                      <label htmlFor="numberGuests">Guest(s)</label>
                      <InputGuests className="d-flex">
                        <input
                          id="numberGuests"
                          {...regBook("numberGuests")}
                          className="text-end"
                          min={0}
                          max={data.maxGuests}
                          type="number"
                          defaultValue={0}
                        ></input>
                        <img src={PersonIcon} alt="Person icon" />
                      </InputGuests>
                      <Error>{errorsBook.numberGuests?.message}</Error>
                    </div>
                    <Button>Book</Button>
                  </div>
                </form>
              ) : (
                <div className="d-flex justify-content-center">
                  <div className="fs-5">
                    <Links to="/login">Log in</Links>
                    <span> / </span>
                    <Links to="/register">Register</Links>
                    <span> to book a venue.</span>
                  </div>
                </div>
              )}

              <div>
                <h2 className="border-bottom border-dark w-100 mt-4">
                  Services
                </h2>
                <div className="d-flex justify-content-evenly my-4">
                  {data.meta && data.meta.wifi ? (
                    <div className="d-flex flex-column align-items-center">
                      <ServicesIcons
                        src={WifiIcon}
                        className="card-icons"
                        alt="wifi icon"
                      />
                      <div className="mt-1 fs-5">Wi-fi</div>
                    </div>
                  ) : (
                    ""
                  )}
                  {data.meta && data.meta.parking ? (
                    <div className="d-flex flex-column align-items-center">
                      <ServicesIcons
                        src={ParkingIcon}
                        className="card-icons"
                        alt="parking icon"
                      />
                      <div className="mt-1 fs-5">Parking</div>
                    </div>
                  ) : (
                    ""
                  )}
                  {data.meta && data.meta.breakfast ? (
                    <div className="d-flex flex-column align-items-center">
                      <ServicesIcons
                        src={FoodIcon}
                        className="card-icons"
                        alt="breakfast icon"
                      />
                      <div className="mt-1 fs-5">Breakfast</div>
                    </div>
                  ) : (
                    ""
                  )}
                  {data.meta && data.meta.pets ? (
                    <div className="d-flex flex-column align-items-center">
                      <ServicesIcons
                        src={PetsIcon}
                        className="card-icons"
                        alt="pets icon"
                      />
                      <div className="mt-1 fs-5">Pets</div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div>
                <h2 className="border-bottom border-dark w-100 mt-4">
                  Description
                </h2>
                <p>{data.description}</p>
              </div>
              <div>
                <h2 className="border-bottom border-dark w-100 mt-4">Owner</h2>
                <div className="d-flex align-items-center my-4">
                  {data.owner && data.owner.avatar ? (
                    <ProfileImgStyle>
                      <img
                        src={data.owner.avatar}
                        className="venue-images"
                        alt="Venue"
                        onError={(e) => {
                          if (e.target.src !== PlaceholderImg) {
                            e.target.onerror = null;
                            e.target.src = PlaceholderImg;
                          }
                        }}
                      />
                    </ProfileImgStyle>
                  ) : (
                    <ProfileImgStyle>
                      <img
                        src={ProfileImg}
                        className="venue-images"
                        alt="Venue"
                      />
                    </ProfileImgStyle>
                  )}
                  {data.owner ? (
                    <div className="ms-3">
                      <h3>{data.owner.name}</h3>
                      <div>{data.owner.email}</div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-between gap-5">
                <div>Venue created: {formatDate(new Date(data.created))}</div>
                <div>Last updated: {formatDate(new Date(data.updated))}</div>
              </div>
              {data.owner && data.owner.name === userName ? (
                <div className="row justify-content-evenly mt-5">
                  <Button2 onClick={() => onClickConfirm(data.id)}>
                    Delete
                  </Button2>
                  <Button data-bs-toggle="modal" data-bs-target="#editModal">
                    Edit
                  </Button>

                  <div
                    className="modal fade"
                    id="editModal"
                    tabIndex="-1"
                    aria-labelledby="editModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-xl modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-3" id="editModalLabel">
                            Edit Venue
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <form className="modal-body row gap-1 align-items-center p-4">
                          <div className="row flex-wrap">
                            <div className="col-12 col-md-5">
                              <div className="d-flex flex-column">
                                <label className="fs-5" htmlFor="name">
                                  Venue Name*
                                </label>
                                <Input2
                                  id="name"
                                  {...regEdit("name")}
                                  defaultValue={data.name}
                                />
                                <Error>{errorsEdit.name?.message}</Error>
                              </div>
                              <div className="row flex-row">
                                <div className="pe-0 col">
                                  <label className="fs-5" htmlFor="maxGuests">
                                    Max Guest(s)*
                                  </label>
                                  <InputGuests className="d-flex">
                                    <input
                                      id="maxGuests"
                                      {...regEdit("maxGuests")}
                                      className="text-end"
                                      min={0}
                                      max={100}
                                      type="number"
                                      defaultValue={data.maxGuests}
                                    ></input>
                                    <img src={PersonIcon} alt="Person icon" />
                                  </InputGuests>
                                  <Error>{errorsEdit.maxGuests?.message}</Error>
                                </div>
                                <div className="col-12">
                                  <label className="fs-5" htmlFor="price">
                                    Price*
                                  </label>
                                  <div className="d-flex">
                                    <Input2
                                      id="price"
                                      className="text-end fs-4"
                                      min={0}
                                      max={999999}
                                      type="number"
                                      defaultValue={data.price}
                                      {...regEdit("price")}
                                    />
                                    <span className="ms-1 fs-5">kr</span>
                                  </div>
                                  <div>(per night)</div>
                                  <Error>{errorsEdit.price?.message}</Error>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-md-7">
                              <div className="d-flex flex-column">
                                <label className="fs-5" htmlFor="media">
                                  Direct Image link
                                </label>
                                <Input2
                                  id="media"
                                  title="A direct image link usually ends with '.jpg' or something similar"
                                  {...regEdit("media")}
                                  defaultValue={data.media[0]}
                                />
                                <div>
                                  (Generate on{" "}
                                  <Links
                                    to="https:/postimages.org/"
                                    target="_blank"
                                  >
                                    postimages.org
                                  </Links>
                                  )
                                </div>
                                <Error>{errorsEdit.media?.message}</Error>
                              </div>
                              <div className="d-flex gap-4 ms-1">
                                <div>
                                  <div className="d-flex align-items-center">
                                    <Check
                                      id="wifi"
                                      type="checkbox"
                                      {...regEdit("wifi")}
                                      defaultChecked={data.meta.wifi}
                                    ></Check>
                                    <label className="fs-5 ms-2" htmlFor="wifi">
                                      Wifi
                                    </label>
                                  </div>
                                  <div>
                                    <Check
                                      id="parking"
                                      type="checkbox"
                                      {...regEdit("parking")}
                                      defaultChecked={data.meta.parking}
                                    ></Check>
                                    <label
                                      className="fs-5 ms-2"
                                      htmlFor="parking"
                                    >
                                      Parking
                                    </label>
                                  </div>
                                </div>
                                <div>
                                  <div>
                                    <Check
                                      id="breakfast"
                                      type="checkbox"
                                      {...regEdit("breakfast")}
                                      defaultChecked={data.meta.breakfast}
                                    ></Check>
                                    <label
                                      className="fs-5 ms-2"
                                      htmlFor="breakfast"
                                    >
                                      Breakfast
                                    </label>
                                  </div>
                                  <div>
                                    <Check
                                      id="pets"
                                      type="checkbox"
                                      {...regEdit("pets")}
                                      defaultChecked={data.meta.pets}
                                    ></Check>
                                    <label className="fs-5 ms-2" htmlFor="pets">
                                      Pets
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex flex-column mt-3">
                            <label className="fs-5" htmlFor="description">
                              Description*
                            </label>
                            <TextArea
                              id="description"
                              {...regEdit("description")}
                              defaultValue={data.description}
                            />
                            <Error>{errorsEdit.description?.message}</Error>
                          </div>
                          <div className="modal-footer">
                            <ButtonSmaller2
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </ButtonSmaller2>
                            <ButtonSmaller
                              onClick={handleEdit(onEditHandler)}
                              className="btn btn-primary"
                            >
                              Save
                            </ButtonSmaller>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            {bookings &&
            data.owner.name &&
            userName === data.owner.name &&
            bookings.length !== 0 ? (
              <>
                <hr className="mt-5" />
                <div className="mt-5">
                  <h3>Bookings to your Venue</h3>
                  <table className="table table-striped">
                    <thead>
                      <tr className="table-secondary">
                        <th scope="col">Order no.</th>
                        <th scope="col">Date of arrival</th>
                        <th scope="col">Date of departure</th>
                        <th scope="col">Guest(s)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((data, index) => (
                        <tr key={data.id}>
                          <th scope="row">{index + 1}</th>
                          <td>{data.dateFrom.slice(0, 10)}</td>
                          <td>{data.dateTo.slice(0, 10)}</td>
                          <td>{data.guests}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default VenuePage;
