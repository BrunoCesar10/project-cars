module.exports = mongoose => {
    Car = mongoose.model(
        "car",
        mongoose.Schema(
            {
                brand: Brand,
                model: String,
                name: String,
                year: Number,
                price: Number,
                color: String

            },
            { timestamps: true }
        )
    );

    schema.method("toJSON", function(){
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Car = mongoose.model("car", schema);
    return Car;
}