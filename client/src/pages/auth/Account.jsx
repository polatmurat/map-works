import React from "react";
import Nav from "../../components/Nav";
import Header from "../../components/home/Header";
import { useSelector } from "react-redux";
import AccountList from "../../components/skeleton/AccountList";

const Account = () => {

    const {user} = useSelector((state) => state.authReducer)


  return (
    <>
      <Nav />
      <div className="mt-[70px]">
        <Header>Acc Info</Header>
      </div>
      <div className="container mt-[80px]">
        <div className="flex flex-wrap -mx-6">
          <div className="w-full md:w-4/12 p-6">
            <AccountList />
          </div>
          <div className="w-full md:w-8/12 p-6">
            <h1 className="heading">Name</h1>
            <span className="block mt-3 capitalize font-medium text-sm">
              {user?.name}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
