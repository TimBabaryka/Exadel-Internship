
import supertest from "supertest";
import authRouter from "./authRouter.mjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import authUser from "./authUser.js";
import authController from "./authController.mjs";



const userInput = {
  userName: "TimDoe",
  email:"myag@mail.ru",
  password: "12345"
}


describe("app", () => {
beforeAll(async () => {
  await mongoose.disconnect();
  await mongoose.connect("mongodb://localhost:27017/test-101");
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("get user", () => {
  it("should return user", async () => {

    const user = new authUser(userInput)
    await user.save()
    const foundUser = await authUser.findOne({userName: "TimDoe"})
    const expected = user.userName
    const actual = foundUser.userName;
    expect(actual).toEqual(expected);


  });
});

describe("save user", () => {
  it("should return saved user", async () => {
    const user = new authUser(userInput)
    const saved = await user.save()
    const expected = user.userName
    const actual = saved.userName;
    expect(actual).toEqual(expected); 
  });
});



describe("update user", () => {
  it("should return updated user", async () => {
    const user = new authUser(userInput)
    await user.save();
    user.userName = "newname";
    const updated = await user.save();
    const expected = "newname"
    const actual = updated.userName;
    expect(actual).toEqual(expected); 
  });
});




  // describe("POST/registration", () => {
  //   describe("POST: when valid registration", () => {
  //     it("username and password", async () => {
  //       const response = await supertest(authRouter)
  //         .post("/registration")
  //         .send ( {email:"myag@mail.ru", userName: "TimDoe", password: "12345",
  //        })

  //        expect(response.status).toBe(200);
     
  //        const user = await authUser.findById(response.body.user._id)
  //        expect(response.body).toMatchObject({
  //        user:{
  //         email:"myag@mail.ru", userName: "TimDoe", password: "12345"
  //        },
  //        token: user.tokens[0].token
  //        })
  //        expect(user.password).not.toBe('1234567890')
  //        })
       
  //     });
  //   });
  });

