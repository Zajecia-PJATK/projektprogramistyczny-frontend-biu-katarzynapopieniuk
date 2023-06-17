export default function handleCheckBoxSelectionChange(event, selectedCheckBoxes, setSelectedCheckBoxes) {
    var newSelectedCheckboxes;
    if (selectedCheckBoxes.filter(selectedValue => selectedValue === event.target.value).length > 0) {
        newSelectedCheckboxes = selectedCheckBoxes.filter(selectedCheckBox => selectedCheckBox !== event.target.value);
    } else {
        newSelectedCheckboxes = [...selectedCheckBoxes, event.target.value];
    }
    setSelectedCheckBoxes(newSelectedCheckboxes);
}