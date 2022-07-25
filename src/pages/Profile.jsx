import { getAuth, updateProfile } from "firebase/auth";
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { async } from "@firebase/util";

import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg";
import homeIcon from "../assets/svg/homeIcon.svg";
import ListingItem from "../components/ListingItem";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setForemData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const [changeDetails, setChangeDetails] = useState(false);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const { name, email } = formData;

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingsRef = collection(db, "listings");
      const q = query(
        listingsRef,
        where("user", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );

      const querySnapshot = await getDocs(q);
      const listings = [];

      querySnapshot.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    };
    fetchUserListings();
  }, [auth.currentUser.uid]);

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };
  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        //update fb
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        //update display name fire store
        const ueserRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(ueserRef, { name });
      }
    } catch (error) {
      toast.error("error updating profile");
    }
  };
  const onChange = (e) => {
    setForemData((prevState) => ({
      ...formData,
      [e.target.id]: e.target.value,
    }));
  };
  const onDelete = async (listingId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, "listings", listingId));
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingId
      );
      setListings(updatedListings);
      toast.success("Successfully deleted listing");
    }
  };

  return (
    <>
      <div className='profile'>
        <header className='profileHeader mb-6'>
          <p className='pageHeader'>My Profile</p>
          <button type='button' className='logOut' onClick={onLogout}>
            Logout
          </button>
        </header>
        <main>
          <div className='profileDetailsHeader mb-2'>
            <p className='profileDetailsText'>Personal Details</p>
            <p
              className='changePersonalDetails'
              onClick={() => {
                changeDetails && onSubmit();
                setChangeDetails((prevState) => !prevState);
              }}
            >
              {changeDetails ? "done" : "change"}
            </p>
          </div>
          <div className='profileCard'>
            <form>
              <input
                type='text'
                id='name'
                className={!changeDetails ? "profileName" : "profileNameActive"}
                disabled={!changeDetails}
                value={name}
                onChange={onChange}
              />
              <input
                type='email'
                id='email'
                className={
                  !changeDetails ? "profileEmail" : "profileEmailActive"
                }
                disabled={!changeDetails}
                value={email}
                onChange={onChange}
              />
            </form>
          </div>

          <Link to='/create-listing' className='createListing'>
            <img src={homeIcon} alt='home icon' />
            <p>Sell Or Rent Your Home</p>
            <img src={arrowRight} alt='arrow right' />
          </Link>

          {!loading && listings?.length > 0 && (
            <>
              <p className='listingText'>Your Listings</p>
              <ul className='listingsList'>
                {listings.map((listing) => (
                  <ListingItem
                    key={listing.id}
                    listing={listing.data}
                    id={listing.id}
                    onDelete={() => onDelete(listing.id)}
                  />
                ))}
              </ul>
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default Profile;
