import { useState } from 'react';

type Data = {
    color : string;
    description : string;
    capacity:string;
    screensize:number;
}
type Product = {
  id: string;
  name: string;
  data: Data;
};


const usePost = (url:string) => {
    const FormComponent = () => {
      const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
}

  const [data, setData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const postData = async (body:typeof FormComponent|null) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await response.json();
      setData(json);
      console.log(setData);
    } catch(failed) {
      setError(String(failed));
    }
    setLoading(false);
  };

  return { postData, data, error, loading };
};

export default usePost;