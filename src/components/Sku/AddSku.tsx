import React, { memo, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Popover, Whisper } from "rsuite";
import * as Yup from "yup";
import FormikHelper from "../../helpers/formikHelper";
import { commonSubmit } from "../../services/UserServices";

const AddProductPopUp = React.forwardRef(({ content, formProps, ...props }: any, ref) => {
    return (
        <Popover ref={ref} {...props} style={{ width: "70%" }}>
            <FormikHelper {...formProps}></FormikHelper>
        </Popover>
    );
});

AddProductPopUp.displayName = 'AddProductPopUp';

const initialValues = {
    productName: "",
    productSize: "",
    productBrand: "",
    productCategory: "",
    dominance: "",
    tier: "",
    flavorStrain: "",
    form: "",
};

const validationSchema = Yup.object().shape({
    productName: Yup.string().trim(),
    productSize: Yup.string().trim().required("*required field"),
    productBrand: Yup.string().trim().required("*required field"),
    productCategory: Yup.string().trim().required("*required field"),
    dominance: Yup.string().trim().required("*required field"),
    tier: Yup.string().trim().required("*required field"),
    flavorStrain: Yup.string().trim().required("*required field"),
    form: Yup.string().trim().required("*required field"),
});

const productSize = ["1.0g", "0.1g", "3.5g", "0.35g", "10-Pack", "0.2g", "1.0g Tins", "0.1g Tins", "0.02g 10-Pack", "Tins", "0.1g 10-Pack", "1.0g (6.7oz)", "0.3g (2.0oz)", "0.5g", "14.0g", "0.33g", "2.5g", "0.3g", "3.0g", "8.0g", "0.02g", "1.5g", "0.01g", "0.04g", "0.08g", "1.2g", "2.0g", "7.0g", "5.0g"];

const productCategory = ["Concentrate", "Flower", "Infused (edible)", "Pre-Roll Flower", "Flower (packaged eighth - each)", "Concentrate (Each)", "Vape Cartridge (weight - each)", "Extract (weight - each)", "Shake/Trim (by strain)", "Other Concentrate (weight - each)", "Edible (weight - each)", "Tincture (volume - each)", "Flower (packaged - each)", "Flower (packaged half ounce - each)", "Buds", "Pre-Roll Infused", "Edible (volume - each)", "Vape Cartridge (volume - each)", "Infused (non-edible)", "Capsule (weight - each)", "Shake/Trim", "Tincture (weight - each)", "Pre-Roll Leaf", "Flower (packaged quarter - each)"];

const dominance = ['Hybrid', 'Indica', 'Sativa'];

const getFlavor = () => {
    const flavor = ["Jamaican Jerk", "JamBand", "Cakes and Pies", "Papaya Cake", "Full Metal Cherry", "Bump Drop", "Cosmic Crisp", "Indoor - Y2K", "Indoor - Biskant√©", "Indoor - Xeno", "California Orange", "Ice Cream Cake", "Platinum Cookies", "Silverback Haze", "Cookies & Cream", "Divorce Cake", "Souffle", "Blackberry Kush", "Cookie Wsreck", "God's Breath", "True OG", "Super Sour Diesel", "Sweet Cheese", "Cheetah Piss", "Peanut Butter Runtz", "Tina", "Ghost Train Haze", "ATF", "Dolato", "Golden Pineapple", "Wet Dream", "Bubba Snow", "Fruit Bowl", "O.G. Glue", "Flavor Train", "Delicioso", "Sherb Cake", "Maui Wowie", "Alien OG", "Sour Pebbles", "Stardawg", "Havana Avenue", "Extra Pulp", "Punch Mints", "A&B", "Extra Strength", "", "Original Mint", "Cinnamon CBD 1:1 (100mg THC + 100mg CBD)", "Royal Mint", "Sours Orchard Peach", "Watermelon Lemonade", "Pinapple Habenero", "Wild Berry", "Pineapple Extra Strength", "Grape Extra Strength", "Blue Raspberry Extra Strength", "Blueberry Extra Strength", "Surf Beast", "Dream Walker", "Lilikoi Blossom", "Bimini Tangelo", "Pomelo Jello", "Lemon Blossom", "Slurmy Temple", "Limetini", "Mendo Mist", "Bahama Mama #3", "Weed Nap", "Green Mango Clouds", "Chocolate Sinful Cinnamon Unwind", "Chocolate Kushes & Cream Unwind", "Chem Dawg", "GDP", "N.Y. Piff", "Lemon Kush", "Lambs Bread", "S.F.V. O.G.", "Blue Dream", "Durban Poison", "OG Kush", "Afghani Ice Cream", "Chem Reserve", "GG#4", "Indoor - Gelonade", "Ooh La La", "Blanco", "Pink Rozay", "Dopest", "Peanut Butter", "Chocolate Chip", "Indoor - Black Tahoe", "Lem Chem", "Slymer", "GG4", "40s Private Reserve", "Sleep", "Strawberry", "Blue Raspberry", "Dr. Pibb", "Milk", "Cherry Limeade", "Double Bubble EV", "Clementine", "Space Monkey", "Double Lemon Pie", "Mimosa", "Mystery Flavor", "White Cherry", "Strawberry Lemonade", "Cream Pop", "Project Z", "Slapz", "Luxuriotti", "Gush Mints", "Apples and Bananas", "Gelato", "Strawberry Cough", "Pink Lemonade", "Watermelon Punch", "Sour Diesel", "Banana Runtz", "Jack Herer", "Blueberry Cobbler", "Lemonade Slushie", "Blueberry Fritter", "Grand Daddy Purp", "French Toast", "Pineapple Sorbet", "Tangie", "Sea Salt Dark Chocolate", "Strawberry Watermelon", "Wedding Cake", "Sour Lemon Lime", "Oranges & Cream", "Fruity Krunch", "Passion Fruit", "Sour Watermelon Gummy", "Sour Cherry Lime", "Sour Green Apple", "Green Apple CBD", "Pineapple", "Indie Pure Shatter", "Pacific Dream", "Donut Shack", "Apple Fritter", "Blue Zkittlez", "Strawberry Shortcake", "Big Sky OG", "Joyibles Sour", "Sour Strawberry Lemonade", "Sour PomBerry CBN", "Sour Pineapple", "Mr. Puffer", "Bubba Kush Root Beer", "Original Cola", "Orange Kush", "Lemon Royale", "Tangie Dream", "Cherry Truffle", "Amnesia Haze", "Dutch Treat", "Sol Berry", "Naked", "Desert Gold", "Cloud Berry", "Hangover", "King Louis XIII", "Juicy Peach Mimosa", "Laughing Gas", "Double OG Chem", "Fruit Punch", "Grape Ape", "Snozz Berry", "Flo", "Super Lemon Haze", "Bubba Kush", "Classic Variety 2022", "Bio Diesel", "Black Cherry OG", "Classic Marble Chocolate", "Watermelon", "Menthol", "Nerve", "Mocha Crunch", "Milk Chocolate", "Cookies and Cream Chocolate", "GMO S1", "Cereal Milk", "Reverie", "High Frequency", "Classic", "Pyxy", "Sour Lights", "Passion Plum", "Lava Cake", "Peanut Butter Fritter", "Grandi Mintz", "White Runtz", "Pancakes #7", "Cosmic Runtz", "Modified Grapes", "Lemon Kombucha", "Hindu Kush", "Grape Pancakes", "Lemon Pastries", "Gorilla Glue #4", "4G", "Kombucha", "After Dark", "Runtz", "Frozen Acai", "Blueberry Bubble", "Night Owl", "King Louis XIII OG", "Watermelon Z", "LA Confidential CDT", "Tropical Kool Aid", "Citrus Medley", "Strawberry Banana", "Orange Strawberry", "Strawberry Cookies", "Kush", "TWC x Loompa", "AO x PaiGow", "Milk and Cookies", "Orange Cream Elite", "The Solution", "Player 1", "Boombox", "Rubicon", "Pomegranate Diesel", "Rainmaker", "Cindy White", "Member OG", "Honey Hiker", "Blue Burnout", "KY Jealous", "Sumo Grande", "Bronco's Breath", "Purple Punch", "Cactus Cooler", "Sunset sherbert", "Fritter Glitter", "Watermelon Mimosa", "Biscotti x Runtz", "Gelato Mint", "Pro-Cake", "Peanut Butter Breath", "Crazy X", "No. 34", "Pro0Cake", "Oreoz", "Thin Mintz", "Spritzer", "Holy Runtz", "Waiting Game #16", "White Gushers", "Gushers", "Gelato Ice Cream", "Gush Mintz", "Jelly Ranchers", "Hindu Zkittlez", "M.A.C. 1", "Falcon 9", "Kush Mints", "Buttermilk Biscuits", "Bubby's OG", "Gelato Animal Mints", "Black Tea - Raspberry", "Green Tea - Mango", "Super Boof", "Sherbert Cake", "Mac 1", "Blue Dream Gelato", "Franken Cake", "Super Boof x Bubblegum", "Icy Cake", "Grandi Guava", "J-1", "MAC 1", "J01", "Short Cake", "Black Raspberry", "Velo", "The Sauce", "Peach Bellini", "Limoncello", "Pina Colada", "Strawberry Lemonade Balanced", "Strawberry Margarita Balanced", "Stay Asleep Dream Berry Classic", "Fast Asleep Dream Berry Quick", "Stay Asleep Ratio 5:1", "Green Apple", "Berries", "Grape", "Banana Sherbet", "Grapes and Cream", "Strawberry Sundae", "Sweet Nightmare", "Dirty Taxi", "Biscotti French Toast", "Orange Gelato", "Glueball", "Marionberry", "Elderberry", "Sour Apple", "Huckleberry", "Raspberry", "Pear", "Garlicane"];
    return flavor;
};

const productForm: any[] = ['Form-1', 'Form-2'];

const tier = ['Good', 'Better', 'Best'];

const AddSku = (props: { helper: { setProductAdded: any; brandList: any; buttonName: any; buttonClass: any; }; formData: { ID: any; SIZE: any; BRAND: any; CATEGORY_NAME: any; DOMINANCE: any; TIER: any; FLAVOR_STRAIN: any; FORM: any; ITEM_NAME: any; }; }) => {
    const { setProductAdded, brandList, buttonName, buttonClass } = props.helper;
    const { ID, SIZE, BRAND, CATEGORY_NAME, DOMINANCE, TIER, FLAVOR_STRAIN, FORM, ITEM_NAME } = props.formData;

    const addProductTriggerRef = useRef<any>(null);
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState(initialValues);

    const closeProductPopUp = () => addProductTriggerRef?.current?.close();

    const inheritFunctions = (data: any) => {
        setProductAdded((pre: number) => ++pre);
        closeProductPopUp();
    }

    const fields = [
        { type: "text", placeholder: "If left blank Product Name Will Be Generated based on Attributes", name: "productName", readonly: true },
        { type: "select", name: "productSize", placeholder: "Select Product Size", options: productSize.map((d) => ({ label: d, value: d })).sort((a, b) => a.label.localeCompare(b.label)) },
        { type: "select", name: "productBrand", placeholder: "Select Brand", options: brandList.map((d: { label: any; }) => ({ label: d.label, value: d.label })).sort((a: { label: string; }, b: { label: any; }) => a.label.localeCompare(b.label)) },
        { type: "select", name: "productCategory", placeholder: "Select Category", options: productCategory.map((d) => ({ label: d, value: d })).sort((a, b) => a.label.localeCompare(b.label)) },
        { type: "select", name: "dominance", placeholder: "Select Dominance", options: dominance.map((d) => ({ label: d, value: d })).sort((a, b) => a.label.localeCompare(b.label)) },
        { type: "select", name: "tier", placeholder: "Select Tier", options: tier.map((d) => ({ label: d, value: d })) },
        { type: "select", name: "flavorStrain", placeholder: "Flavor or Strain (Choose or Add New)", options: getFlavor().map((d) => ({ label: d, value: d })) },
        { type: "select", name: "form", placeholder: "Select Form (Choose or Add New)", options: productForm.map((d) => ({ label: d, value: d })) }
    ];

    const formProps = {
        initialValues: formValues,
        validationSchema,
        sendFunction: commonSubmit,
        fields,
        endpoint: ID === 0 ? 'add-product' : 'update-product',
        divClass: 'col-xl-6',
        inheritFunctions
    }

    useEffect(() => {
        if (ID > 0) {
            setFormValues({ productName: ITEM_NAME || "", productSize: SIZE || "", productBrand: BRAND || "", productCategory: CATEGORY_NAME || "", dominance: DOMINANCE || "", tier: TIER || "", flavorStrain: FLAVOR_STRAIN || "", form: FORM || "" });
        }
    }, [ID])


    return (
        <>
            <Whisper
                trigger="click"
                ref={addProductTriggerRef}
                placement="auto"
                speaker={<AddProductPopUp content={""} formProps={formProps} />}
            >
                <button className={`${buttonClass}`}>
                    {buttonName}
                </button>
            </Whisper>
        </>
    );
}

export default memo(AddSku);