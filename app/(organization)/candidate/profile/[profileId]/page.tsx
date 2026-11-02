interface iAppPros {
     params : Promise<{profileId:string}>
}
export default async function ProfileUpdatePage({params}:iAppPros){
    const {profileId} = await params;
    return (
        <div>
             <h1>Update Profile Page {profileId}</h1>
        </div>
    )
}