// import { Configuration, OpenAIApi } from 'openai';
import OpenAI from 'openai';
import dotenv from 'dotenv'
dotenv.config();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});
export const summaryController = async (req, res) => {

    try {
        const { text } = req.body;
        const response = await openai.completions.create({
            model: "text-davinci-003",
            prompt: `Summarize this  \n${text}`,
            max_tokens: 500,
            temperature: 0.5,
        });

        if (response) {
            if (response.choices[0].text) {
                return res.status(200).json(response.choices[0].text);
            }
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};


export const paragraphController = async (req, res) => {
    try {
        const { text } = req.body;
        const response = await openai.completions.create({
            model: "text-davinci-003",
            prompt: `write a detail paragraph about \n${text}`,
            max_tokens: 500,
            temperature: 0.5,
        });

        console.log(response); // Check the entire response
        if (response) {
            if (response.choices[0].text) {
                return res.status(200).json(response.choices[0].text);
            }
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const chatbotController = async (req, res) => {
    try {
        const { text } = req.body;
        const data = await openai.completions.create({
            model: "text-davinci-003",
            prompt: `Answer question similar to how yoda from star war would.
             Me: 'what is your name?'
            yoda: 'yoda is my name'
            Me: ${text}`,
            max_tokens: 300,
            temperature: 0.7,
        });
        if (data) {
            if (data.choices[0].text) {
                return res.status(200).json(data.choices[0].text);
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            message: err.message,
        });
    }
};

export const jsconverterController = async (req, res) => {
    try {
        const { text } = req.body;
        const data = await openai.completions.create({
            model: "text-davinci-002",
            prompt: `/* convert these instruction into javascript code \n${text}`,
            max_tokens: 400,
            temperature: 0.25,
        });
        if (data) {
            if (data.choices[0].text) {
                return res.status(200).json(data.choices[0].text);
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            message: err.message,
        });
    }
};

export const scifiImageController = async (req, res) => {
    try {
        const { text } = req.body;
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: `create a anime image \n${text}`,
            n: 1,
            size: "1024x1024",
        });

        if (response) {
            if (response.data[0].url) {
                return res.status(200).json(response.data[0].url);
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(404).json({
            message: err.message,
        });
    }
};