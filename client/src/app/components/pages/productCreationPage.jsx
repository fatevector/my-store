import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { validator } from "../../utils/validator";
import { getCategoriesList } from "../../store/categories";
import { createProduct } from "../../store/products";

import TextField from "../common/textField";
import SelectField from "../common/selectField";
import BackHistoryButton from "../common/backButton";
import CheckBoxField from "../common/checkBoxField";

const ProductCreationPage = () => {
    const [data, setData] = useState({
        name: "",
        definition: "",
        image: "",
        popular: false,
        category: "",
        price: ""
    });
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();

    const categories = useSelector(getCategoriesList());
    const categoriesList = categories
        .map(c => ({
            label: c.name,
            value: c._id
        }))
        .filter(c => c.label !== "Популярное");

    const validatorConfig = {
        name: {
            isRequired: {
                message: "Введите название товара"
            }
        },
        category: {
            isRequired: {
                message: "Выберите категорию товара"
            }
        },
        price: {
            isRequired: {
                message: "Введите стоимость товара"
            },
            isPrice: {
                message:
                    "Стоимость товара должна быть неотрицательным числом и выражаться в рублях"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleChange = target => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(createProduct(data, "/admin"));
    };

    useEffect(() => {
        validate();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Название"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            error={errors.name}
                        />
                        <TextField
                            label="Описание"
                            name="definition"
                            value={data.definition}
                            onChange={handleChange}
                            error={errors.definition}
                        />
                        <TextField
                            label="Ссылка на изображение"
                            name="image"
                            value={data.image}
                            onChange={handleChange}
                            error={errors.image}
                        />
                        <CheckBoxField
                            name="popular"
                            value={data.popular}
                            onChange={handleChange}
                            error={errors.popular}
                        >
                            Популярный товар
                        </CheckBoxField>
                        <SelectField
                            label="Категория"
                            defaultOption="Выберите..."
                            options={categoriesList}
                            name="category"
                            onChange={handleChange}
                            value={data.category}
                            error={errors.category}
                        />
                        <TextField
                            label="Стоимость"
                            name="price"
                            value={data.price}
                            onChange={handleChange}
                            error={errors.price}
                        />
                        <button
                            type="submit"
                            disabled={!isValid}
                            className="btn btn-primary w-100 mx-auto"
                        >
                            Добавить товар
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductCreationPage;
