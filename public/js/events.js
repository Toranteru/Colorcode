// Add resizing based on the number of images uploaded
member_upload.addEventListener('change', () => {
  Array.from(member_upload.files).forEach(file => {
    let member_name = file.name.slice(0, -4);
    let imageElement = document.createElement('img');
    imageElement.src = URL.createObjectURL(file);
    imageElement.id = member_name;
    images.push({
      element: imageElement,
      name: member_name,
    });
  })
  renderImages();
})

view_divider_slider.addEventListener('input', () => {
  view_divider.style.top = `${view_divider_slider.value}vh`;
  Array.from(member_names).forEach(member => {
    member.style.top = `${view_divider_slider.value - 5}vh`;
  })
  renderViewHeight();
})

window.addEventListener('resize', renderViewHeight);