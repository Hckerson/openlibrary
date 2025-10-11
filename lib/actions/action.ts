// "use server";
// import prisma from "@/prisma/connections";


export const deleteUser = async (id: string) => {
  console.log(id)
  try {
    // const deletedUSer = await prisma.user.delete({where : {id : id}})
    // return deletedUSer;
  } catch (error) {
    console.log(error);
  }
};

