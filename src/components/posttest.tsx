import usePost from './post';

function MyComponent() {
  const { postData, data, loading, error } = usePost('https://api.restful-api.dev/objects');

  const handleSubmit = async (event: { preventDefault: () => void; target: HTMLFormElement | undefined; }) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    // await postData(formData);
  }

  if (error) {
    return <div>An error occurred: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* ... your form inputs ... */}
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
        //   value={formData.username}
        //   onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default MyComponent;
