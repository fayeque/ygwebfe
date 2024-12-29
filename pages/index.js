
import OrganizationList from '../components/organization-list'
import useFetch from '../hooks/useFetch';

export default function Home() {


  const { data, error, loading } = useFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/group/getGroups`);

  console.log("data here is ",data);
  console.log("error here is ",error);
  console.log("loading  here is ",loading);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="container mx-auto py-6 px-4">
      <OrganizationList groups={data} />
    </main>
  )
}