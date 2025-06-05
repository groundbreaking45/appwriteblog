import { Controller } from "react-hook-form"
import { Editor } from "@tinymce/tinymce-react"


function RTE({ name, label, defaultValue = "", control }) {
  

    return (
        <div className="w-full max-w-full overflow-visible min-h-[300px]"> {label && <label className='inline-block mb-1 pl-1' >{label}</label>}

            <Controller
                name={name || "Content"}
                control={control}
                defaultValue={defaultValue}
                render={({ field: { onChange, value } }) => (
                    <Editor
                        value={value}
                        apiKey='yvmgba5mfs5779rqgzsvp7v9542bdzibo12hlhqqwhvsom4c'
                        init={
                            {
                                initialValue: defaultValue,
                                branding: false,
                                height: typeof window !== 'undefined' && window.innerWidth < 768 ? 300 : 500,
                                menubar: false,
                                plugins: ["image",
                                    "advlist",
                                    "autolink",
                                    "lists",
                                    "link",
                                    "image",
                                    "charmap",
                                    "preview",
                                    "anchor",
                                    "searchreplace",
                                    "visualblocks",
                                    "code",
                                    "fullscreen",
                                    "insertdatetime",
                                    "media",
                                    "table",
                                    "code",
                                    "help",
                                    "wordcount",
                                    "anchor",],
                                toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                                content_style: `  body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }
                                                @media (max-width: 768px) {
                                                body { font-size: 16px; }
                                                                            }`,

                                // mobile: {
                                //     theme: 'mobile',
                                //     plugins: ['autosave', 'lists', 'autolink'],
                                //     toolbar: ['undo', 'redo', 'bold', 'italic', 'bullist', 'numlist'],
                                // },
                                width: "100%",
                                min_width: 0,
                            }} onEditorChange={onChange}

                    />


                )}

            />

        </div>
    )
}

export default RTE