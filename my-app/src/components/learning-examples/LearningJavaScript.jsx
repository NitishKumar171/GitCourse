const person={
    personname:'Ranga',
    address:{
        line1:'233 collins street ',
        city:'Melboune',
        coutnry:'Australia',
},
profiles:['twitter','Facebook','Instagram','linkedin'],
printProfile:()=>{
    person.profiles.map(
        profile=>console.log(profile)

    )
}
}
export default function LearningJavaScript(){
    return(
        <>
        <div>LearningJavaScript</div>
        <div>{person.personname}</div>
        <div>{person.address.line1}</div>
        <div>{person.address.city}</div>
        <div>{person.address.coutnry}</div>
        <div>{person.profiles[3]}</div>


        </>
    )
}