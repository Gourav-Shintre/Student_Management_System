import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useDeletepostByIdMutation,
  useGetAllPostQuery,
} from "../services/StudentApi";

function Home() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/add");
  };
  
  const res = useGetAllPostQuery();
  
  const [deletePost] = useDeletepostByIdMutation();
  console.log(deletePost);
  
  const handleDelete =async(id)=>{
    try{
      await deletePost(id);
      toast.success("Record deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

    }catch{
      toast.error("Failed to delete record. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }

  if (res.isLoading) return <div>...Loading</div>;
  if (res.isError) return <h1>Something Went Wrong {res.error.error}</h1>;

  return (
    <>
      <div>
        <button className="bg-primary text-light " onClick={handleClick}>
          Create New
        </button>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Roll No.</th>
              <th scope="col">Age</th>
              <th scope="col">Mobile No.</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {res.data.map((std) => (
              <tr key={std.std_id}>
                <td>{std.std_id}</td>
                <td>{std.std_name}</td>
                <td>{std.std_add}</td>
                <td>{std.std_roll}</td>
                <td>{std.std_age}</td>
                <td>{std.std_mob}</td>
                <td colSpan="2">
                  <div className=" ">
                    <MdDelete
                      role="button"
                      className="text-danger pe-auto "
                      onClick={() => {
                        handleDelete (std.std_id);
                      }}
                    />

                    <Link to={`/update/${std.std_id}`}>
                      <FaEdit role="button" className="text-primary mx-4" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Home;
