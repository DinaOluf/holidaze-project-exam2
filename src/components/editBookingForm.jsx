import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import PersonIcon from "../assets/images/person-icon.png";
import { DateInput, InputGuests, PersonIconStyle } from './styles/venue.styling';
import { ButtonSmaller, ButtonSmaller2 } from './styles/buttons.styles';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Error } from './styles/form.styles';
import { confirmAlert } from 'react-confirm-alert';
import "react-datepicker/dist/react-datepicker.css";
import { Loader } from './styles/loader.styles';

const schema = yup
  .object({
    dateArrival: yup
      .string()
      .matches(/(^0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4}$)/, "Must match date format"),
    dateDeparture: yup
      .string()
      .matches(/(^0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4}$)/, "Must match date format"),
    numberGuests: yup
      .number()
      .required('Please choose the number of guests')
  })
  .required();

function EditBooking(props) {
    const navigate = useNavigate();
    const [ venue, setVenue ] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
     const date = new Date();
    const [ arrivalDate, setArrivalDate ] = useState(date);
    const [ departureDate, setDepartureDate]  = useState(date);
    const name = localStorage.getItem("Name");
    const url = 'https://api.noroff.dev/api/v1/holidaze/venues/'+props.venue+'?_bookings=true';

    useEffect(() => {
        async function getData() {
          try {
            setIsLoading(true);
            setIsError(false);
  
            const token = localStorage.getItem("Token");
  
            const options = {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            };
  
            const response = await fetch(url, options);
            const json = await response.json();
            setVenue(json);
            if(json.errors){
                setIsError(true);
            }
  
          } catch (error) {
            console.log(error);
            setIsError(true);
          } finally {
            setIsLoading(false);
          }
        }
    
        getData();
      }, [url]);

    useEffect(() => {
          const arrival = new Date(props.data.dateFrom);
          const departure = new Date(props.data.dateTo);
          setArrivalDate(arrival);
          setDepartureDate(departure);
      }, [props]);
      
      const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
       });

       if (isLoading) {
        return <main id="container d-flex flex-column p-5">
          <div className="d-flex justify-content-center mt-4">
              <Loader className="spinner-grow text-secondary" role="status">
                      <span className="visually-hidden">Loading...</span>
              </Loader>
          </div>
      </main>;
      }
      
      if (isError) {
        return <main id="container d-flex flex-column p-5">
          <div className="d-flex justify-content-center mt-4">
              An error occurred. Please refresh.
          </div>
      </main>;
      }
       
       var getDaysArray = function(bookings) {
         let arr = [];
         for (let i = 0; i < bookings.length; i++) {
           for(let dt=new Date(bookings[i].dateFrom); dt<=new Date(bookings[i].dateTo); dt.setDate(dt.getDate()+1)){
             if(bookings[i].id !== props.data.id){
               arr.push(new Date(dt));
             }
           }
         } 
         return arr; 
       };
       
       const onCancelConfirm = async (e) => {
         confirmAlert({
           title: 'Cancel booking',
           message: 'Are you sure you want to cancel your order?',
           buttons: [
             {
               label: 'Yes',
               onClick: () => onCancelHandler(e)
             },
             {
               label: 'No',
             }
           ]
         });
       }
       
       const onCancelHandler = async (e) => {
         const url = "https://api.noroff.dev/api/v1/holidaze/bookings/"+props.data.id;
         const token = localStorage.getItem("Token");
        
         const options = {
             method: "DELETE",
             headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`
             }
         };
        
         try {
           await fetch(url, options);
           navigate(`/Profile/${name}`);
        
         } catch (error) {
           console.log(error);
         }
        
         reset();
        };
       
       const onEditHandler = async (e) => {
        const url = "https://api.noroff.dev/api/v1/holidaze/bookings/"+props.data.id;
        const token = localStorage.getItem("Token");
       
        let newData = {
          dateFrom: arrivalDate,
          dateTo: departureDate,
          guests: e.numberGuests
        };
       
        const options = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(newData),
        };
       
        try {
          const response = await fetch(url, options);
          const json = await response.json();
          console.log(json); //remove
          if ( json.id ) {
            navigate("/booked-success");
          } else {
            console.log("Some error occured");
          }
       
        } catch (error) {
          console.log(error);
        }
       
        reset();
       };

       console.log(venue)

    return (
        <>
        {   venue && venue.bookings
            ? <div className='d-flex justify-content-center my-5 w-100'>
            <form className='d-flex flex-column justify-content-between flex-wrap ms-2' >
                <div className='d-flex flex-column fs-5'>
                  <label htmlFor="dateArrival">Date of arrival</label>
                  <DateInput className='text-center' id="dateArrival" {...register("dateArrival").value} selected={arrivalDate} onChange={date => setArrivalDate(date)} type='date' minDate={date} excludeDates={getDaysArray(venue.bookings)} dateFormat="dd/MM/yyyy" defaultValue={arrivalDate} calendarStartDay={1}></DateInput>
                  <Error>{errors.dateArrival?.message}</Error>
                </div>
                <div className='d-flex flex-column fs-5'>
                  <label htmlFor="dateDeparture">Date of departure</label>
                  <DateInput className='text-center' id="dateDeparture" {...register("dateDeparture").value} selected={departureDate} onChange={date => setDepartureDate(date)} type='date' minDate={new Date(arrivalDate.getTime() + 86400000)} excludeDates={getDaysArray(venue.bookings)} dateFormat="dd/MM/yyyy" defaultValue={departureDate} calendarStartDay={1}></DateInput>
                  <Error>{errors.dateDeparture?.message}</Error>
                </div>
                <div className='d-flex flex-column fs-5'>
                  <label htmlFor="numberGuests">Guest(s)</label>
                  <InputGuests className='d-flex'>
                    <input id="numberGuests" className='text-end' type='number' min={1} max={venue.maxGuests} {...register("numberGuests")} defaultValue={props.data.guests}></input>
                    <PersonIconStyle src={PersonIcon} alt='Person icon' />
                  </InputGuests>
                  <Error>{errors.numberGuests?.message}</Error>
                </div>
                <div className="d-flex flex-wrap gap-2">
                  <ButtonSmaller2 onClick={(e) => {onCancelConfirm(e)}}>Cancel</ButtonSmaller2>
                  <ButtonSmaller onClick={handleSubmit(onEditHandler)}>Edit</ButtonSmaller>
                </div>
              </form>
            </div>
            :   <Loader className="spinner-grow text-secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Loader>
        }

        </>
    )
  }

  export default EditBooking;