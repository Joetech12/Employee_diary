import { BiEdit, BiTrashAlt } from 'react-icons/bi';
import { getUsers } from '../lib/helper';
import { useQuery } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleChangeAction,
  updateAction,
  deleteAction,
  toggleAndUpdateAction,
} from '../redux/reducer';
import data from '../database/data.json';

export default function Table() {
  const { isLoading, isError, data, error } = useQuery('users', getUsers);

  if (isLoading) return <div>Employee is Loading...</div>;
  if (isError) return <div>Got Error {error}</div>;

  return (
    <table className="w-[900px] md:w-full mt-[30px]">
      <thead>
        <tr className="bg-gray-800">
          <th className="px-[20px] py-[20px]">
            <span className="text-gray-200">Name</span>
          </th>
          <th className="px-[20px] py-[20px]">
            <span className="text-gray-200">Email</span>
          </th>
          <th className="px-[20px] py-[20px]">
            <span className="text-gray-200">Salary</span>
          </th>
          <th className="px-[20px] py-[20px]">
            <span className="text-gray-200">Birthday</span>
          </th>
          <th className="px-[20px] py-[20px]">
            <span className="text-gray-200">Status</span>
          </th>
          <th className="px-[20px] py-[20px]">
            <span className="text-gray-200">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-200">
        {data.map((obj, i) => (
          <Tr {...obj} key={i} />
        ))}
      </tbody>
    </table>
  );
}

function Tr({ _id, name, avatar, email, salary, date, status }) {
  const visible = useSelector((state) => state.app.client.toggleForm);
  const dispatch = useDispatch();

  const onUpdate = () => {
    dispatch(toggleChangeAction(_id));
    if (visible) {
      dispatch(updateAction(_id));
    }
  };

  const onDelete = () => {
    if (!visible) {
      dispatch(deleteAction(_id));
    }
  };

  return (
    <tr className="bg-gray-200 text-center border-b border-gray-300">
      <td className="px-16 py-2 flex flex-row items-center">
        <img
          src={avatar || '#'}
          alt=""
          className="h-8 w-8 rounded-full object-cover"
        />
        <span className="text-center ml-2 font-semibold">
          {name || 'Unknown'}
        </span>
      </td>
      <td className="px-[20px] py-[20px]">
        <span>{email || 'Unknown'}</span>
      </td>
      <td className="px-[20px] py-[20px]">
        <span>{salary || 'Unknown'}</span>
      </td>
      <td className="px-[20px] py-[20px]">
        <span>{date || 'Unknown'}</span>
      </td>
      <td className="px-[20px] py-[20px]">
        <button className="cursor">
          <span
            className={`${status == 'On-Duty' && 'bg-green-500 text-white'} ${
              status == 'On-Leave' && 'bg-rose-500 text-white'
            } px-5 py-1 rounded-full`}
          >
            {status || 'Unknown'}
          </span>
        </button>
      </td>
      <td className="px-[20px] py-[20px] flex justify-around gap-5">
        <button className="cursor" onClick={onUpdate}>
          <BiEdit size={25} color={'rgb(34,197,94)'}></BiEdit>
        </button>
        <button className="cursor" onClick={onDelete}>
          <BiTrashAlt size={25} color={'rgb(244,63,94)'}></BiTrashAlt>
        </button>
      </td>
    </tr>
  );
}
