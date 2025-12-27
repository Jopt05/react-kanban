interface LayoutButtonProps {
    onChange: (layout: 'grid' | 'list') => void;
    layout: 'grid' | 'list';
}

const LayoutButton = ({ onChange, layout }: LayoutButtonProps) => {
  return (
    <div
      className="lg:hidden flex fixed bottom-5 right-5 rounded-full bg-[#2b2c37] items-center justify-center cursor-pointer border border-gray-300"
    >
        <i 
        className={`bx bx-list text-white text-xl py-2 px-3 border-r rounded-tl-full rounded-bl-full border-gray-300 ${layout === 'list' ? 'bg-[#6260c5]' : ''}`}
        onClick={() => onChange('list')}
        ></i> 
        <i 
        className={`bx bx-grid text-white text-xl py-2 px-3 rounded-tr-full rounded-br-full ${layout === 'grid' ? 'bg-[#6260c5]' : ''}`}
        onClick={() => onChange('grid')}
        ></i>
    </div>    
  )
}

export default LayoutButton