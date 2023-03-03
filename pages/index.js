import Head from 'next/head';
import { BiCheck, BiUserPlus, BiX } from 'react-icons/bi';
import Table from '../components/table';
import Form from '../components/form';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAction, toggleChangeAction } from '../redux/reducer';
import { deleteUser, getUsers } from '../lib/helper';
import { useQueryClient } from 'react-query';

export default function Home() {
  const visible = useSelector((state) => state.app.client.toggleForm);
  const deleteId = useSelector((state) => state.app.client.deleteId);
  const queryclient = useQueryClient();

  const dispatch = useDispatch();

  const handler = () => {
    dispatch(toggleChangeAction());
  };

  const deletehandler = async () => {
    if (deleteId) {
      await deleteUser(deleteId);
      await queryclient.prefetchQuery('users', getUsers);
      await dispatch(deleteAction(null));
    }
  };

  const cancelhandler = async () => {
    await dispatch(deleteAction(null));
  };

  return (
    <>
      <Head>
        <title>Employee Diary</title>
        <meta name="description" content="Employees list recording app" />
        <link rel="icon" href="/employee_logo.svg" />
      </Head>

      <div className="px-[20px] md:px-14 md:py-8 ">
        <main className="">
          <div className="flex justify-center space-x-[20px] items-center border-b">
            <img
              src="/employee_logo.png"
              alt="employee"
              className="w-[50px] h-[50px]"
            />
            <h1 className="text-3xl md:text-5xl text-center font-bold py-10">
              Employee Diary
            </h1>
          </div>
          <div className="container mx-auto flex justify-between py-5 border-b">
            <div className="left flex gap-3">
              <button
                onClick={handler}
                className="flex bg-blue-800 text-white px-4 py-2 border-[2px] rounded-md hover:bg-gray-50 hover:border-blue-800 hover:border-[2px] hover:font-bold hover:text-gray-800"
              >
                Add Employee{' '}
                <span className="px-1">
                  <BiUserPlus size={23}></BiUserPlus>
                </span>
              </button>
            </div>
            {deleteId ? (
              DeleteComponent({ deletehandler, cancelhandler })
            ) : (
              <></>
            )}
          </div>
          {/* collapsable form */}
          {visible ? <Form /> : <></>}
          {/* table */}
          <div className="w-[95vw] md:w-full overflow-auto">
            <Table />
          </div>
        </main>
        <footer className="w-full flex justify-center mt-[50px] mb-[20px]">
          <p className="text-[14px]">Developed by - Ifeanyi Umeh © 2023</p>
        </footer>
      </div>
    </>
  );
}

function DeleteComponent({ deletehandler, cancelhandler }) {
  return (
    <div className="flex gap-5">
      <button>Are you sure?</button>
      <button
        onClick={deletehandler}
        className="flex bg-red-500 text-white px-4 py-2 border rounded-md hover:bg-rose-500 hover:border-red-500 hover:text-gray-50"
      >
        Yes
        <span className="px-1">
          <BiX color="rgb(255 255 255" size={25} />
        </span>
      </button>
      <button
        onClick={cancelhandler}
        className="flex bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-green-600 hover:border-green-500 hover:text-gray-50"
      >
        No
        <span className="px-1">
          <BiCheck color="rgb(255 255 255" size={25} />
        </span>
      </button>
    </div>
  );
}
